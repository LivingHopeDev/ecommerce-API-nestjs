import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title should be a string ' })
  title: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description should be a string ' })
  description: string;
}
