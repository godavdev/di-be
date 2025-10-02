import { IsDateString, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;
  @IsString()
  isbn: string;
  @IsDateString()
  releaseDate: string;
  @IsString()
  author: string;
}
