import { NestFactory } from '@nestjs/core';
import { pathToFileURL } from 'url';
import { resolve } from 'path';
import { AppModule } from '../app.module';
import { ArticlesService } from '../articles/articles.service';

const buildContent = (article: {
  intro?: string;
  sections?: Array<{ heading?: string; paragraphs?: string[] }>;
  highlights?: string[];
}) => {
  const blocks: string[] = [];

  if (article.intro) {
    blocks.push(article.intro.trim());
  }

  if (Array.isArray(article.sections)) {
    article.sections.forEach((section) => {
      if (section.heading) {
        blocks.push(section.heading.trim());
      }
      if (Array.isArray(section.paragraphs)) {
        section.paragraphs
          .filter(Boolean)
          .forEach((paragraph) => blocks.push(paragraph.trim()));
      }
    });
  }

  if (Array.isArray(article.highlights) && article.highlights.length > 0) {
    blocks.push('Points a retenir:');
    article.highlights.filter(Boolean).forEach((item) => {
      blocks.push(`- ${item.trim()}`);
    });
  }

  return blocks.filter(Boolean).join('\n\n');
};

const loadAdviceArticles = async () => {
  const advicePath = resolve(__dirname, '../../../frontend/src/data/adviceArticles.js');
  const moduleUrl = pathToFileURL(advicePath).href;
  const module = await import(moduleUrl);
  return Array.isArray(module.adviceArticles) ? module.adviceArticles : [];
};

const seedArticles = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const articlesService = app.get(ArticlesService);

  const existing = await articlesService.findAll();
  const existingTitles = new Set(existing.map((article) => article.title));

  const adviceArticles = await loadAdviceArticles();

  let created = 0;
  let skipped = 0;

  for (const article of adviceArticles) {
    if (!article?.title) {
      skipped += 1;
      continue;
    }
    if (existingTitles.has(article.title)) {
      skipped += 1;
      continue;
    }

    await articlesService.create({
      title: article.title,
      category: article.category || 'Conseils',
      image: article.image || null,
      content: buildContent(article),
    });

    created += 1;
  }

  console.log(`Seed complete. Created: ${created}, skipped: ${skipped}.`);
  await app.close();
};

seedArticles().catch((error) => {
  console.error('Seed failed:', error);
  process.exitCode = 1;
});
