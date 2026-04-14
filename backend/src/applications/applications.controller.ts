import { Controller, Post, Get, Patch, Body, Param, UseGuards, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApplicationStatus } from './entities/application.entity';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':offerId')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'cv', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 },
  ]))
  apply(
    @Param('offerId') offerId: string,
    @Body() body: any,
    @UploadedFiles() files: { cv?: any[]; coverLetter?: any[] },
    @Req() req,
  ) {
    return this.applicationsService.applyToOffer(offerId, body, req.user.userId, files);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  getMyApplications(@Req() req) {
    return this.applicationsService.getMyApplications(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('enterprise')
  getEnterpriseApplications(@Req() req) {
    return this.applicationsService.getEnterpriseApplications(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(
    @Param('id') applicationId: string,
    @Body('status') status: ApplicationStatus,
    @Req() req,
  ) {
    return this.applicationsService.updateStatus(applicationId, status, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/profile')
  getApplicantProfile(@Param('id') applicationId: string, @Req() req) {
    return this.applicationsService.getApplicantProfile(applicationId, req.user.userId);
  }
}