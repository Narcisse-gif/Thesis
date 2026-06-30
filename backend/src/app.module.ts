import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './users/entities/user.entity';
import { StudentProfile } from './users/entities/student-profile.entity';
import { EnterpriseProfile } from './users/entities/enterprise-profile.entity';
import { Offer } from './offers/entities/offer.entity';
import { Application } from './applications/entities/application.entity';
import { Message } from './messages/entities/message.entity';
import { Favorite } from './favorites/entities/favorite.entity';
import { AdminSettings } from './admin/entities/admin-settings.entity';
import { Notification } from './notifications/entities/notification.entity';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OffersModule } from './offers/offers.module';
import { ApplicationsModule } from './applications/applications.module';
import { MessagesModule } from './messages/messages.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AdminModule } from './admin/admin.module';
import { Article } from './articles/article.entity';
import { ArticlesModule } from './articles/articles.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const entities = [
          User,
          StudentProfile,
          EnterpriseProfile,
          Offer,
          Application,
          Message,
          Favorite,
          AdminSettings,
          Article,
          Notification,
        ];
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        const databaseUrl = configService.get<string>('DATABASE_URL');

        if (databaseUrl) {
          return {
            type: 'postgres' as const,
            url: databaseUrl,
            entities,
            synchronize: !isProduction,
            ssl: isProduction ? { rejectUnauthorized: false } : undefined,
          };
        }

        return {
          type: 'postgres' as const,
          host: configService.get<string>('DB_HOST') || 'localhost',
          port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
          username: configService.get<string>('DB_USERNAME') || 'postgres',
          password: configService.get<string>('DB_PASSWORD') || 'Narcisse',
          database: configService.get<string>('DB_NAME') || 'stagelink',
          entities,
          synchronize: !isProduction,
          ssl: configService.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : undefined,
        };
      },
    }),
    UsersModule,
    AuthModule,
    OffersModule,
    ApplicationsModule,
    MessagesModule,
    FavoritesModule,
    AdminModule,
    ArticlesModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
