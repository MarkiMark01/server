import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Post } from '../post/entities/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto, post: Post) {
    const comment = this.commentRepo.create({ ...createCommentDto, post });
    return this.commentRepo.save(comment);
  }

  async remove(id: number) {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Коментар не знайдено');
    }
    await this.commentRepo.remove(comment);
    return { message: 'Коментар успішно видалено' };
  }

  // async findAll(
  //   postId: number,
  //   page = 1,
  //   limit = 10,
  //   search?: string,
  //   // sortBy: keyof Comment = 'createdAt',
  //   // order: 'ASC' | 'DESC' = 'DESC',
  // ) {
  //   const skip = (page - 1) * limit;
  //   const queryBuilder = this.commentRepo.createQueryBuilder('comment')
  //     .leftJoinAndSelect('comment.post', 'post')
  //     .where('post.id = :postId', { postId });
  //   // Фільтрація за текстом коментаря
  //   if (search) {
  //     queryBuilder.andWhere('comment.text ILIKE :search', { search: `%${search}%` });
  //   }

  //   // Сортування
  //   // queryBuilder.orderBy(`comment.${sortBy}`, order);
  //   // Пагінація
  //   queryBuilder.skip(skip).take(limit);
  //   const [comments, total] = await queryBuilder.getManyAndCount();
  //   return {
  //     data: comments,
  //     total,
  //     page,
  //     limit,
  //     totalPages: Math.ceil(total / limit),
  //   };
  // }
}



