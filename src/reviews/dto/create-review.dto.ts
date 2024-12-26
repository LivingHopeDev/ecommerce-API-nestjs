import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'Product Id is required.' })
  @IsNumber({}, { message: 'Product Id should be number' })
  productId: number;
  @IsNotEmpty({ message: 'Ratings is required.' })
  @IsNumber({}, { message: 'Ratings should be number' })
  ratings: number;

  @IsNotEmpty({ message: 'Comment is required.' })
  @IsString({ message: 'Comment should be string' })
  comment: string;
}
