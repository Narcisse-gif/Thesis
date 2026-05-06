import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { Article } from '../articles/article.entity';

const OLD_TITLE = 'Activer son reseau local a Ouagadougou et Bobo pour trouver de vraies opportunites';
const NEW_TITLE = 'Activer son reseau local pour trouver de vraies opportunites';

const cleanContent = (value: string) => {
  return value
    .replace(/Ouagadougou/gi, '')
    .replace(/Bobo/gi, '');
};

const updateTitle = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const articleRepository = app.get(getRepositoryToken(Article));

  const article = await articleRepository.findOne({ where: { title: OLD_TITLE } });
  if (!article) {
    console.log('Article not found. No changes made.');
    await app.close();
    return;
  }

  article.title = NEW_TITLE;
  if (article.content) {
    article.content = cleanContent(article.content);
  }
  await articleRepository.save(article);
  console.log('Article title updated.');
  await app.close();
};

updateTitle().catch((error) => {
  console.error('Update failed:', error);
  process.exitCode = 1;
});
