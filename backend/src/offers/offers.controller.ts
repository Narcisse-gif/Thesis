import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request, Query } from '@nestjs/common';
import { OffersService } from './offers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OfferStatus } from './entities/offer.entity';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  // Seules les entreprises (authentifiées) peuvent créer
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOfferDto: any, @Request() req) {
    return this.offersService.create(createOfferDto, req.user.userId);
  }

  // Publique (ou avec des filtres spéciaux pour Admin/Student)
  @Get()
  findAll(@Query() query: any) {
    return this.offersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(id);
  }

  // Validation Admin ou Entreprise propriétaire
  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: OfferStatus) {
    return this.offersService.updateStatus(id, status);
  }
}
