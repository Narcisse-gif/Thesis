import { Injectable, UnauthorizedException, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    const user = await this.usersService.create(
      {
        email: registerDto.email,
        passwordHash: hashedPassword,
        role: registerDto.role,
      },
      registerDto
    );

    return this.generateToken(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    return this.generateToken(user);
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    if (!currentPassword || !newPassword) {
      throw new BadRequestException('Missing password fields');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.updateAuth(userId, { passwordHash: hashedPassword });
    return { message: 'Password updated' };
  }

  async changeEmail(userId: string, email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const updated = await this.usersService.updateAuth(userId, { email });
    if (!updated) {
      throw new ConflictException('Email update failed');
    }

    return this.generateToken(updated);
  }

  async requestPasswordReset(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = crypto.randomBytes(24).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

    await this.usersService.updateAuth(user.id, {
      resetPasswordToken: token,
      resetPasswordExpiresAt: expiresAt,
    });

    return {
      message: 'Reset token generated',
      resetToken: token,
      expiresAt,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    if (!token || !newPassword) {
      throw new BadRequestException('Missing token or password');
    }

    const user = await this.usersService.findByResetToken(token);
    if (!user || !user.resetPasswordExpiresAt || user.resetPasswordExpiresAt < new Date()) {
      throw new UnauthorizedException('Token expired or invalid');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.updateAuth(user.id, {
      passwordHash: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpiresAt: null,
    });

    return { message: 'Password reset successful' };
  }

  private generateToken(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    
    // Déterminer le profil à retourner pour le store Frontend
    const profile = user.role === 'STUDENT' ? user.studentProfile : user.enterpriseProfile;
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        profile: profile,
      }
    };
  }
}