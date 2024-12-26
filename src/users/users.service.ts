import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dto/user-signup.dto';
import { compare, hash } from 'bcrypt';
import { UserSigninDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(payload: UserSignupDto): Promise<UserEntity> {
    const userExist = await this.findUserByEmail(payload.email);
    if (userExist) throw new BadRequestException('Email is not available');
    payload.password = await hash(payload.password, 10);
    let user = this.userRepository.create(payload);
    user = await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async signin(payload: UserSigninDto) {
    const userExist = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: payload.email })
      .getOne();
    if (!userExist) throw new BadRequestException('Bad credentials.');

    const isPassword = await compare(payload.password, userExist.password);
    if (!isPassword) throw new BadRequestException('Bad credentials');
    delete userExist.password;
    return userExist;
  }
  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES },
    );
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const userExists = await this.userRepository.findOneBy({ id });
    if (!userExists) throw new NotFoundException('User not found');
    return userExists;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
