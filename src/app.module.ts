import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './shared/prisma/prisma.module';

@Module({
  imports: [BooksModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
