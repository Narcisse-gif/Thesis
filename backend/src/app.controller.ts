import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('seed')
  seedDatabase() {
    return this.appService.seedDatabase();
  }

  @Post('dev/clear-offers')
  clearOffersData() {
    return this.appService.clearOffersData();
  }

  @Post('dev/clear-users')
  clearUsersData() {
    return this.appService.clearUsersData();
  }
}
