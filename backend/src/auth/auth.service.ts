import { Injectable, UnauthorizedException, ConflictException, BadRequestException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { AdminSettings } from '../admin/entities/admin-settings.entity';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(AdminSettings) private adminSettingsRepository: Repository<AdminSettings>,
  ) {}

  private isEmailAllowed(email: string) {
    const normalized = String(email || '').trim().toLowerCase();
    const atIndex = normalized.lastIndexOf('@');
    if (atIndex < 0) return false;
    const localPart = normalized.slice(0, atIndex);
    const domain = normalized.slice(atIndex + 1);
    if (!domain || !domain.includes('.')) return false;
    const blocked = new Set([
      'example.com',
      'example.org',
      'example.net',
      'test.com',
      'test.org',
      'test.net',
      'mailinator.com',
      'yopmail.com',
      'yopmail.fr',
      'yopmail.net',
      'guerrillamail.com',
      '10minutemail.com',
      'tempmail.com',
      'dispostable.com',
    ]);
    if (blocked.has(domain)) return false;
    if (/^(test|fake|demo|example|admin|user)\d*$/i.test(localPart)) return false;
    return true;
  }

  private isPasswordStrong(password: string) {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password || '');
  }


  private async isMaintenanceEnabled() {
    const settings = await this.adminSettingsRepository.find({
      take: 1,
      order: { updatedAt: 'DESC', createdAt: 'DESC' },
    });
    return settings[0]?.maintenanceMode === true;
  }

  async register(registerDto: RegisterDto) {
    if (!this.isEmailAllowed(registerDto.email)) {
      throw new BadRequestException('Email invalide. Utilisez une adresse email reelle.');
    }
    const maintenanceEnabled = await this.isMaintenanceEnabled();
    if (maintenanceEnabled && registerDto.role !== UserRole.ADMIN) {
      throw new ServiceUnavailableException('Plateforme en maintenance. Connexion reservee aux administrateurs.');
    }
    if (!this.isPasswordStrong(registerDto.password)) {
      throw new BadRequestException('Mot de passe trop faible. Min. 8 caracteres, 1 majuscule et 1 chiffre.');
    }
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
    const maintenanceEnabled = await this.isMaintenanceEnabled();
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    if (maintenanceEnabled && user.role !== UserRole.ADMIN) {
      throw new ServiceUnavailableException('Plateforme en maintenance. Connexion reservee aux administrateurs.');
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

    if (!this.isPasswordStrong(newPassword)) {
      throw new BadRequestException('Mot de passe trop faible. Min. 8 caracteres, 1 majuscule et 1 chiffre.');
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

    if (!this.isEmailAllowed(email)) {
      throw new BadRequestException('Email invalide. Utilisez une adresse email reelle.');
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

    if (!this.isEmailAllowed(email)) {
      throw new BadRequestException('Email invalide. Utilisez une adresse email reelle.');
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

    if (!this.isPasswordStrong(newPassword)) {
      throw new BadRequestException('Mot de passe trop faible. Min. 8 caracteres, 1 majuscule et 1 chiffre.');
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