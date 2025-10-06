import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createBookDto: CreateBookDto & { userId: number },
  ): Promise<Book> {
    const createdBook = await this.prisma.book.create({
      data: {
        author: createBookDto.author,
        title: createBookDto.title,
        isbn: createBookDto.isbn,
        releaseDate: createBookDto.releaseDate,
        userId: createBookDto.userId,
      },
    });
    return { ...createdBook };
  }

  async findAll(): Promise<Book[]> {
    return await this.prisma.book.findMany();
  }

  async findById(id: number): Promise<Book | null> {
    return await this.prisma.book.findUnique({
      where: { id },
    });
  }

  async remove(id: number): Promise<Book> {
    const deletedBook = await this.prisma.book.delete({
      where: { id },
    });
    return { ...deletedBook };
  }
}
