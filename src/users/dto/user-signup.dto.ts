import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserSigninDto } from './user-signin.dto';

export class UserSignupDto extends UserSigninDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name should be string' })
  name: string;
}
