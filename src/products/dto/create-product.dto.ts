import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Title is required.' })
  @IsString({ message: 'Title must be a string.' })
  title: string;

  @IsNotEmpty({ message: 'Description is required.' })
  @IsString({ message: 'Description must be a string.' })
  description: string;

  @IsNotEmpty({ message: 'Price is required.' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price should be number & max decimal precision 2.' },
  )
  @IsPositive({ message: 'Price should be a positive number' })
  price: number;

  @IsNotEmpty({ message: 'Stock is required.' })
  @IsNumber({}, { message: 'Stock should be number.' })
  @Min(0, { message: 'Stock can not be negative.' })
  stock: number;

  @IsNotEmpty({ message: 'Images are required.' })
  @IsArray({ message: 'Images should be in array format.' })
  images: string[];

  @IsNotEmpty({ message: 'Category is required.' })
  @IsNumber({}, { message: 'Category id should be a number.' })
  categoryId: number;
}
