

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { getUploadRootPath } from './utils/upload-path';
import { AppDataSource } from './data-source';

async function initializeDatabase() {
  const isProduction = process.env.NODE_ENV === 'production';
  const shouldSync = process.env.DB_SYNC === 'true';
  
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log('Database initialized');
    
    if (shouldSync) {
      try {
        await AppDataSource.synchronize();
        console.log('Database schema synchronized');
      } catch (error) {
        console.error('Failed to synchronize database schema:', error);
        throw error;
      }
    }
  }
}

async function bootstrap() {
  try {
    // Initialize database first, before creating the NestJS app
    await initializeDatabase();
    
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

    // Now that database is initialized, create the admin user
    const appService = app.get(AppService);
    const adminBootstrap = await appService.ensureDefaultAdminExists();
    if (adminBootstrap.created) {
      console.log(`Default admin created: ${adminBootstrap.credentials.admin}`);
    }
    
    const port = parseInt(process.env.PORT || '8081', 10);
    await app.listen(port, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Failed to bootstrap application:', error);
    process.exit(1);
  }
}
bootstrap();
