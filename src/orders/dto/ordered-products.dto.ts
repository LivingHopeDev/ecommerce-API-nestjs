import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OrderedProductsDto {
  @IsNotEmpty({ message: 'Product id is required' })
  productId: number;

  @IsNotEmpty({ message: 'Product id is required' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price should be number & max decimal precision 2' },
  )
  @IsPositive({ message: 'Price can not be negative' })
  product_unit_price: number;

  @IsNumber(
    {},
    { message: 'Quantity should be number & max decimal precision 2' },
  )
  @IsPositive({ message: 'Quantity can not be negative' })
  product_quantity: number;
}
