import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }
}







  // @Get()
  // findAll(
  //   @Query('page', ParseIntPipe) page: number = 1,
  //   @Query('limit', ParseIntPipe) limit: number = 10,
  //   @Query('search') search?: string,
  //   @Query('sortBy') sortBy?: keyof Post,
  //   @Query('order') order?: 'ASC' | 'DESC',
  // ) {
  //   return this.postService.findAll(page, limit, search, sortBy, order);
  // }
