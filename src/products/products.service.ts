import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CurrentUser } from 'src/utility/decorators/current-user.decorators';
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { OrderStatus } from 'src/orders/enums/order-status.enum';
import dataSource from 'db/data-source';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoriesService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    const category = await this.categoryService.findOne(
      +createProductDto.categoryId,
    );
    const product = this.productRepository.create(createProductDto);
    // const product = Object.assign(ProductEntity,createProductDto) // This line is the same as the one above.
    product.addedBy = currentUser;
    product.category = category;
    return await this.productRepository.save(product);
  }

  async findAll(query: any): Promise<any> {
    let filteredTotalProducts: number;
    let limit: number;
    if (!query.limit) {
      limit = 4;
    } else {
      limit = query.limit;
    }
    const queryBuilder = dataSource
      .getRepository(ProductEntity)
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoin('product.reviews', 'review')
      .addSelect([
        'COUNT(review.id) AS reviewCount',
        'AVG(review.ratings)::numeric(10,2) AS avgRating',
      ])
      .groupBy('product.id,category.id');
    const totalProducts = await queryBuilder.getCount();
    if (query.search) {
      const search = query.search;
      queryBuilder.andWhere('product.title like :title', {
        title: `%${search}%`,
      });
    }
    if (query.category) {
      queryBuilder.andWhere('category.id=:id', {
        id: query.category,
      });
    }
    if (query.minPrice) {
      queryBuilder.andWhere('product.price>=:minPrice', {
        minPrice: query.minPrice,
      });
    }
    if (query.maxPrice) {
      queryBuilder.andWhere('product.price<=:maxPrice', {
        maxPrice: query.maxPrice,
      });
    }
    if (query.minRating) {
      queryBuilder.andHaving('AVG(review.ratings)>=:minRating', {
        minRating: query.minRating,
      });
    }
    if (query.maxRating) {
      queryBuilder.andHaving('AVG(review.ratings)<=:maxRating', {
        maxRating: query.maxRating,
      });
    }
    queryBuilder.limit(limit);
    if (query.offset) {
      queryBuilder.offset(query.offset);
    }
    const products = await queryBuilder.getRawMany();
    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found.');
    return product;
  }

  async update(
    id: number,
    updateProductDto: Partial<UpdateProductDto>,
    currentUser: UserEntity,
  ) {
    const product = await this.findOne(id);
    product.addedBy = currentUser;
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);
    return { message: 'Product deleted successfully' };
  }

  async updateStock(id: number, stock: number, status: string) {
    let product = await this.findOne(id);
    if (status === OrderStatus.DELIVERED) {
      product.stock -= stock;
    } else {
      product.stock += stock;
    }

    product = await this.productRepository.save(product);
    return product;
  }
}
