import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  async findAll() {
    return await this.booksService.findAll();
  }

  // localhost:3000/books/{id} -> id es string
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.booksService.remove(id);
  }
}
