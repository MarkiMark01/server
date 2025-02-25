import { Controller, Post, Delete, Body, Param, ParseIntPipe, NotFoundException, Query, Get } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostService } from '../post/post.service';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService,
  ) {}

  @Post()
  async create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const post = await this.postService.findOne(postId);
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    return this.commentService.create(createCommentDto, post);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.remove(id);
  }

  // @Get()
  // async findAll(
  //   @Param('postId', ParseIntPipe) postId: number,
  //   @Query('page', ParseIntPipe) page = 1,
  //   @Query('limit', ParseIntPipe) limit = 10,
  //   @Query('search') search?: string,
  //   // @Query('sortBy') sortBy: keyof Comment = 'createdAt',
  //   @Query('order') order: 'ASC' | 'DESC' = 'DESC',
  // ) {
  //   const post = await this.postService.findOne(postId);
  //   if (!post) {
  //     throw new NotFoundException(`Post with ID ${postId} not found`);
  //   }
  //   return this.commentService.findAll(postId, page, limit, search, 
  //     // sortBy, order
  //   );
  // }
}


