import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Article | null> {
    return this.articlesService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Article>): Promise<Article> {
    return this.articlesService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.articlesService.remove(id);
  }
}
