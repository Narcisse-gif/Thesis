import { Controller, Get, Param, Query } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';

@Controller('enterprises')
export class EnterprisesController {
  constructor(private readonly enterprisesService: EnterprisesService) {}

  @Get()
  list(@Query('search') search?: string) {
    return this.enterprisesService.list(search);
  }

  @Get(':id')
  getOne(@Param('id') id: string, @Query('includeAll') includeAll?: string) {
    const includeAllOffers = includeAll === 'true' || includeAll === '1';
    return this.enterprisesService.getOne(id, includeAllOffers);
  }
}
