import { Injectable, UnauthorizedException, ConflictException, BadRequestException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
// import nodemailer from 'nodemailer';
import { sendOtpWithEmailJs } from '../utils/emailjs';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { AdminSettings } from '../admin/entities/admin-settings.entity';
import { UserRole } from '../users/entities/user.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(AdminSettings) private adminSettingsRepository: Repository<AdminSettings>,
    private notificationsService: NotificationsService,
  ) {}

  private isEmailAllowed(email: string) {
    const normalized = this.normalizeEmail(email);
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

  private normalizeEmail(email: string) {
    return String(email || '').trim().toLowerCase();
  }


  private async isMaintenanceEnabled() {
    const settings = await this.adminSettingsRepository.find({
      take: 1,
      order: { updatedAt: 'DESC', createdAt: 'DESC' },
    });
    return settings[0]?.maintenanceMode === true;
  }

  async register(registerDto: RegisterDto) {
    const normalizedEmail = this.normalizeEmail(registerDto.email);
    if (!this.isEmailAllowed(normalizedEmail)) {
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
        email: normalizedEmail,
        passwordHash: hashedPassword,
        role: registerDto.role,
      },
      registerDto
    );

    if (user.role === UserRole.ENTERPRISE) {
      const companyName = user.enterpriseProfile?.companyName || user.email;
      await this.notificationsService.createForRole(UserRole.ADMIN, {
        title: 'Nouvelle entreprise inscrite',
        message: `${companyName} vient de creer un compte et peut necessiter une verification.`,
        type: 'GENERAL',
        link: '/admin/entreprises',
      });
    }

    return this.generateToken(user);
  }

  async login(loginDto: LoginDto) {
    const maintenanceEnabled = await this.isMaintenanceEnabled();
    const user = await this.usersService.findByEmail(this.normalizeEmail(loginDto.email));
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

    const normalizedEmail = this.normalizeEmail(email);
    if (!this.isEmailAllowed(normalizedEmail)) {
      throw new BadRequestException('Email invalide. Utilisez une adresse email reelle.');
    }

    const updated = await this.usersService.updateAuth(userId, { email: normalizedEmail });
    if (!updated) {
      throw new ConflictException('Email update failed');
    }

    return this.generateToken(updated);
  }

  async requestPasswordReset(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const normalizedEmail = this.normalizeEmail(email);
    if (!this.isEmailAllowed(normalizedEmail)) {
      throw new BadRequestException('Email invalide. Utilisez une adresse email reelle.');
    }

    const user = await this.usersService.findByEmail(normalizedEmail);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Limitation de délai désactivée pour le développement/test

    // Génère un code numérique à 6 chiffres
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 min

    await this.usersService.updateAuth(user.id, {
      resetPasswordToken: code,
      resetPasswordExpiresAt: expiresAt,
    });

    // Email personnalisé
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;background:#f9f9f9;padding:32px 24px;border-radius:12px;border:1px solid #e0e0e0;">
        <h2 style="color:#2563eb;">Réinitialisation de votre mot de passe</h2>
        <p>Bonjour,</p>
        <p>Vous avez demandé à réinitialiser votre mot de passe sur <b>StageLink</b>.</p>
        <p style="font-size:18px;margin:24px 0;">Votre code de réinitialisation est :</p>
        <div style="font-size:32px;font-weight:bold;letter-spacing:8px;background:#e0e7ff;color:#1e40af;padding:16px 0;border-radius:8px;text-align:center;">${code}</div>
        <p style="margin:24px 0 0 0;">Ce code est valable 30 minutes.</p>
        <p style="color:#666;font-size:13px;margin-top:24px;">Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.</p>
        <hr style="margin:32px 0 16px 0;border:none;border-top:1px solid #e0e0e0;" />
        <div style="font-size:12px;color:#888;text-align:center;">StageLink Burkina Faso</div>
      </div>
    `;

    // Envoi d'OTP via EmailJs
    try {
      await sendOtpWithEmailJs(user.email, code);
    } catch (err) {
      console.error('Erreur lors de l\'envoi de l\'OTP via EmailJs:', err);
      throw new ServiceUnavailableException('Erreur lors de l\'envoi de l\'OTP. Contactez le support.');
    }

    return {
      message: 'Code de réinitialisation envoyé par email',
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
