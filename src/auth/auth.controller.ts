import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import type { JwtPayload } from './types/jwt-payload.type';
import { JwtService } from '@nestjs/jwt';
import { compareHash, hashString } from './utils/hash';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() { email, name, password }: RegisterDto) {
    await this.usersService.create(name, email, await hashString(password));
    return true;
  }

  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);
    if (user === null) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!(await compareHash(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  @Post('profile')
  @UseGuards(AuthGuard)
  profile(@Request() { jwt }: { jwt: JwtPayload }) {
    return jwt;
  }
}
