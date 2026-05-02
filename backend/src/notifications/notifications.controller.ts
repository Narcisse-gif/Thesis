import { Controller, Delete, Get, Patch, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getMine(@Req() req) {
    return this.notificationsService.findMine(req.user.userId);
  }

  @Get('unread-count')
  getUnreadCount(@Req() req) {
    return this.notificationsService.getUnreadCount(req.user.userId);
  }

  @Patch('read-all')
  markAllAsRead(@Req() req) {
    return this.notificationsService.markAllAsRead(req.user.userId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @Req() req) {
    return this.notificationsService.markAsRead(id, req.user.userId);
  }

  @Delete('read')
  deleteRead(@Req() req) {
    return this.notificationsService.deleteRead(req.user.userId);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string, @Req() req) {
    return this.notificationsService.deleteOne(id, req.user.userId);
  }
}
