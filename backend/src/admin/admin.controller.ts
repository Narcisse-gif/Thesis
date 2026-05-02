import { Controller, Get, Patch, UseGuards, Req, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OfferStatus } from '../offers/entities/offer.entity';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard/stats')
  getDashboardStats(@Req() req) {
    return this.adminService.getDashboardStats(req.user.userId);
  }

  @Get('users')
  getAllUsers(@Req() req) {
    return this.adminService.getAllUsers(req.user.userId);
  }

  @Get('users/:id')
  getUserById(@Req() req, @Param('id') id: string) {
    return this.adminService.getUserById(req.user.userId, id);
  }

  @Get('offers')
  getAllOffers(@Req() req) {
    return this.adminService.getAllOffers(req.user.userId);
  }

  @Get('applications')
  getAllApplications(@Req() req) {
    return this.adminService.getAllApplications(req.user.userId);
  }

  @Patch('moderate/:offerId')
  moderateOffer(
    @Req() req,
    @Param('offerId') offerId: string,
    @Body('status') status: OfferStatus,
  ) {
    return this.adminService.moderateOffer(req.user.userId, offerId, status);
  }

  @Patch('enterprises/:userId/verify')
  verifyEnterprise(
    @Req() req,
    @Param('userId') userId: string,
    @Body('isVerified') isVerified?: boolean,
    @Body('isSuspended') isSuspended?: boolean,
  ) {
    const flag = typeof isVerified === 'boolean' ? isVerified : true;
    return this.adminService.verifyEnterprise(req.user.userId, userId, flag, isSuspended);
  }

  @Patch('students/:userId/suspension')
  updateStudentSuspension(
    @Req() req,
    @Param('userId') userId: string,
    @Body('isSuspended') isSuspended: boolean,
  ) {
    return this.adminService.updateStudentSuspension(req.user.userId, userId, isSuspended);
  }

  @Get('settings')
  getSettings(@Req() req) {
    return this.adminService.getSettings(req.user.userId);
  }

  @Patch('settings')
  updateSettings(@Req() req, @Body() body: any) {
    return this.adminService.updateSettings(req.user.userId, body);
  }
}
