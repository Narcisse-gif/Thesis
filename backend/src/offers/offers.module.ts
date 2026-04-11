import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { Offer } from './entities/offer.entity';
import { EnterpriseProfile } from '../users/entities/enterprise-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, EnterpriseProfile])],
  controllers: [OffersController],
  providers: [OffersService],
  exports: [OffersService],
})
export class OffersModule {}
