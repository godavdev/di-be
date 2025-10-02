import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const createdBook = await this.prisma.book.create({
      data: {
        author: createBookDto.author,
        title: createBookDto.title,
        isbn: createBookDto.isbn,
        releaseDate: createBookDto.releaseDate,
        userId: 0,
      },
    });
    return createdBook.id;
  }

  async findAll() {
    return await this.prisma.book.findMany();
  }

  async remove(id: number) {
    await this.prisma.book.delete({
      where: { id },
    });
    return true;
  }
}
