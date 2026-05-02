

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads/' });

  const appService = app.get(AppService);
  const adminBootstrap = await appService.ensureDefaultAdminExists();
  if (adminBootstrap.created) {
    console.log(`Default admin created: ${adminBootstrap.credentials.admin}`);
  }
  
  const port = process.env.PORT || 8081;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
