import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './users/entities/user.entity';
import { StudentProfile } from './users/entities/student-profile.entity';
import { EnterpriseProfile } from './users/entities/enterprise-profile.entity';
import { Offer, ContractType, OfferStatus } from './offers/entities/offer.entity';
import { Application, ApplicationStatus } from './applications/entities/application.entity';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager() private readonly em: EntityManager) {}

  private getDefaultAdminCredentials() {
    return {
      email: process.env.ADMIN_EMAIL || 'admin@stagelink.bf',
      password: process.env.ADMIN_PASSWORD || 'password123',
    };
  }

  getHello(): string {
    return 'Stagelink API Running';
  }

  async ensureDefaultAdminExists() {
    const { email, password } = this.getDefaultAdminCredentials();

    const existingAdmin = await this.em.findOne(User, {
      where: { email, role: UserRole.ADMIN },
    });

    if (existingAdmin) {
      const passwordMatches = await bcrypt.compare(password, existingAdmin.passwordHash);
      if (!passwordMatches) {
        existingAdmin.passwordHash = await bcrypt.hash(password, 10);
        existingAdmin.isVerified = true;
        await this.em.save(existingAdmin);
      }

      return {
        created: false,
        updated: !passwordMatches,
        credentials: { admin: `${email} / ${password}` },
      };
    }

    const pwd = await bcrypt.hash(password, 10);
    const admin = this.em.create(User, {
      email,
      passwordHash: pwd,
      role: UserRole.ADMIN,
      isVerified: true,
    });
    await this.em.save(admin);

    return {
      created: true,
      credentials: { admin: `${email} / ${password}` },
    };
  }

  async seedDatabase() {
    console.log('Seeding database...');
    // Drop logic
    await this.em.query('TRUNCATE TABLE applications, offers, student_profiles, enterprise_profiles, users CASCADE;');
    const ensuredAdmin = await this.ensureDefaultAdminExists();
    return {
      message: 'Base de donnees reinitialisee et admin cree avec succes!',
      credentials: ensuredAdmin.credentials,
    };
  }

  async clearOffersData() {
    await this.em.query('TRUNCATE TABLE applications, favorites, offers CASCADE;');
    return { message: 'Offres, candidatures et favoris supprimés.' };
  }

  async clearUsersData() {
    await this.em.query('TRUNCATE TABLE applications, favorites, offers, student_profiles, enterprise_profiles, users CASCADE;');
    return { message: 'Utilisateurs et profils supprimés.' };
  }
}
