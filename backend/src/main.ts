

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { getUploadRootPath } from './utils/upload-path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const allowedOrigins = (process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.useStaticAssets(getUploadRootPath(), { prefix: '/uploads/' });

  const appService = app.get(AppService);
  const adminBootstrap = await appService.ensureDefaultAdminExists();
  if (adminBootstrap.created) {
    console.log(`Default admin created: ${adminBootstrap.credentials.admin}`);
  }
  
  const port = parseInt(process.env.PORT || '8081', 10);
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
