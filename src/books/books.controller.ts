import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import type { JwtPayload } from 'src/auth/types/jwt-payload.type';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createBookDto: CreateBookDto,
    @Request() { jwt }: { jwt: JwtPayload },
  ) {
    return await this.booksService.create({
      ...createBookDto,
      userId: jwt.userId,
    });
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.booksService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(id: number) {
    const res = await this.booksService.findById(id);
    if (res === null) {
      throw new NotFoundException('Book not found');
    }
    return res;
  }

  // localhost:3000/books/{id} -> id es string
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.booksService.remove(id);
  }
}
