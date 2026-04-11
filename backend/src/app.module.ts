import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './users/entities/user.entity';
import { StudentProfile } from './users/entities/student-profile.entity';
import { EnterpriseProfile } from './users/entities/enterprise-profile.entity';
import { Offer } from './offers/entities/offer.entity';
import { Application } from './applications/entities/application.entity';
import { Message } from './messages/entities/message.entity';
import { Favorite } from './favorites/entities/favorite.entity';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OffersModule } from './offers/offers.module';
import { ApplicationsModule } from './applications/applications.module';
import { MessagesModule } from './messages/messages.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: 'Narcisse',
      database: process.env.DB_NAME || 'stagelink',
      entities: [
        User,
        StudentProfile,
        EnterpriseProfile,
        Offer,
        Application,
        Message,
        Favorite,
      ],
      synchronize: true, // Auto-create tables in dev environment
    }),
    UsersModule,
    AuthModule,
    OffersModule,
    ApplicationsModule,
    MessagesModule,
    FavoritesModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
