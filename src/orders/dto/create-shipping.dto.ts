import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShippingDto {
  @IsNotEmpty({ message: 'Phone is required' })
  @IsString({ message: 'Phone should be string' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'Phone should be string' })
  name: string;

  @IsNotEmpty({ message: 'address is required' })
  @IsString({ message: 'address should be string' })
  address: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City should be string' })
  city: string;

  @IsNotEmpty({ message: 'Postcode is required' })
  @IsString({ message: 'Postcode should be string' })
  postcode: string;

  @IsNotEmpty({ message: 'State is required' })
  @IsString({ message: 'State should be string' })
  state: string;

  @IsNotEmpty({ message: 'Country is required' })
  @IsString({ message: 'Country should be string' })
  country: string;
}
