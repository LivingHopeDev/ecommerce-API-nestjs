import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorators';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from './entities/product.entity';
import {
  AuthenticationGuard,
  AuthorizationGuard,
} from 'src/utility/guards/auth.guard';
import { Roles } from 'src/utility/common/user.roles.enum';
import { SerializeInterceptor } from 'src/utility/interceptor/serialize.interceptor';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthenticationGuard, AuthorizationGuard([Roles.ADMIN]))
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<ProductEntity> {
    return await this.productsService.create(createProductDto, currentUser);
  }
  @UseInterceptors(SerializeInterceptor)
  @Get()
  async findAll(@Query() query: any): Promise<any> {
    return await this.productsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.productsService.update(
      +id,
      updateProductDto,
      currentUser,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(+id);
  }
}
