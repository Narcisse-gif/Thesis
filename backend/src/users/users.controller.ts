import { Controller, Get, Patch, Body, UseGuards, Req, Post, UploadedFile, UseInterceptors, BadRequestException, Query, Param, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { UserRole } from './entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@Req() req) {
    return this.usersService.getProfile(req.user.userId);
  }

  @Patch('profile')
  updateProfile(@Req() req, @Body() updateData: any) {
    return this.usersService.updateProfile(req.user.userId, updateData);
  }

  @Get('search')
  searchUsers(@Query('q') q: string, @Query('role') role: UserRole) {
    if (role !== UserRole.STUDENT && role !== UserRole.ENTERPRISE) {
      throw new BadRequestException('Role invalide');
    }
    return this.usersService.searchUsers(q, role);
  }

  @Get('students/:id')
  getStudentProfile(@Param('id') id: string, @Req() req) {
    if (req.user?.role !== UserRole.ENTERPRISE && req.user?.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Acces refuse');
    }
    return this.usersService.getStudentProfileByIdentifier(id);
  }

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads', 'avatars');
          fs.mkdir(uploadPath, { recursive: true }, (err) => cb(err, uploadPath));
        },
        filename: (_req, file, cb) => {
          const safeExt = extname(file.originalname) || '.png';
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadAvatar(@Req() req, @UploadedFile() file?: { filename: string }) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const avatarUrl = `/uploads/avatars/${file.filename}`;
    return this.usersService.updateProfile(req.user.userId, { avatarUrl });
  }

  @Post('banner')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads', 'banners');
          fs.mkdir(uploadPath, { recursive: true }, (err) => cb(err, uploadPath));
        },
        filename: (_req, file, cb) => {
          const safeExt = extname(file.originalname) || '.jpg';
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadBanner(@Req() req, @UploadedFile() file?: { filename: string }) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const bannerUrl = `/uploads/banners/${file.filename}`;
    return this.usersService.updateProfile(req.user.userId, { bannerUrl });
  }

  @Post('logo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads', 'logos');
          fs.mkdir(uploadPath, { recursive: true }, (err) => cb(err, uploadPath));
        },
        filename: (_req, file, cb) => {
          const safeExt = extname(file.originalname) || '.png';
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadLogo(@Req() req, @UploadedFile() file?: { filename: string }) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const logoUrl = `/uploads/logos/${file.filename}`;
    return this.usersService.updateProfile(req.user.userId, { logoUrl });
  }

  @Post('cv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads', 'cv');
          fs.mkdir(uploadPath, { recursive: true }, (err) => cb(err, uploadPath));
        },
        filename: (_req, file, cb) => {
          const safeExt = extname(file.originalname) || '.pdf';
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadCv(@Req() req, @UploadedFile() file?: { filename: string }) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const cvUrl = `/uploads/cv/${file.filename}`;
    return this.usersService.updateProfile(req.user.userId, { cvUrl });
  }

  @Post('cover-letter')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads', 'cover-letters');
          fs.mkdir(uploadPath, { recursive: true }, (err) => cb(err, uploadPath));
        },
        filename: (_req, file, cb) => {
          const safeExt = extname(file.originalname) || '.pdf';
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadCoverLetter(@Req() req, @UploadedFile() file?: { filename: string }) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const coverLetterUrl = `/uploads/cover-letters/${file.filename}`;
    return this.usersService.updateProfile(req.user.userId, { coverLetterUrl });
  }

  @Post('company-cv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads', 'company-cv');
          fs.mkdir(uploadPath, { recursive: true }, (err) => cb(err, uploadPath));
        },
        filename: (_req, file, cb) => {
          const safeExt = extname(file.originalname) || '.pdf';
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadCompanyCv(@Req() req, @UploadedFile() file?: { filename: string }) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const cvUrl = `/uploads/company-cv/${file.filename}`;
    return this.usersService.updateProfile(req.user.userId, { cvUrl });
  }
}