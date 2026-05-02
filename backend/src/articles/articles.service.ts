import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  findAll(): Promise<Article[]> {
    return this.articleRepository.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: string): Promise<Article | null> {
    return this.articleRepository.findOneBy({ id });
  }

  create(data: Partial<Article>): Promise<Article> {
    const article = this.articleRepository.create(data);
    return this.articleRepository.save(article);
  }

  remove(id: string): Promise<void> {
    return this.articleRepository.delete(id).then(() => undefined);
  }
}
