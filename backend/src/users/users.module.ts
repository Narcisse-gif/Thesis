import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { StudentProfile } from './entities/student-profile.entity';
import { EnterpriseProfile } from './entities/enterprise-profile.entity';
import { Offer } from '../offers/entities/offer.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EnterprisesController } from './enterprises.controller';
import { EnterprisesService } from './enterprises.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, StudentProfile, EnterpriseProfile, Offer])],
  providers: [UsersService, EnterprisesService],
  exports: [UsersService],
  controllers: [UsersController, EnterprisesController],
})
export class UsersModule {}