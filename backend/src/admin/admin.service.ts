import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import { Offer, OfferStatus } from '../offers/entities/offer.entity';
import { Application } from '../applications/entities/application.entity';
import { AdminSettings } from './entities/admin-settings.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    @InjectRepository(Application) private applicationRepository: Repository<Application>,
    @InjectRepository(AdminSettings) private adminSettingsRepository: Repository<AdminSettings>,
    private notificationsService: NotificationsService,
  ) {}

  private async assertAdmin(adminId: string) {
    const admin = await this.userRepository.findOne({ where: { id: adminId } });
    if (!admin || admin.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Acces refuse');
    }
    return admin;
  }

  async getDashboardStats(adminId: string) {
    await this.assertAdmin(adminId);

    const studentsCount = await this.userRepository.count({ where: { role: UserRole.STUDENT } });
    const enterprisesCount = await this.userRepository.count({ where: { role: UserRole.ENTERPRISE } });
    const offersCount = await this.offerRepository.count();
    const applicationsCount = await this.applicationRepository.count();

    return {
      students: studentsCount,
      enterprises: enterprisesCount,
      offers: offersCount,
      applications: applicationsCount,
    };
  }

  async getAllUsers(adminId: string) {
    await this.assertAdmin(adminId);
    return this.userRepository.find({
      relations: ['studentProfile', 'enterpriseProfile'],
      order: { createdAt: 'DESC' },
    });
  }

  async getUserById(adminId: string, userId: string) {
    await this.assertAdmin(adminId);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['studentProfile', 'enterpriseProfile'],
    });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    return user;
  }

  async getAllOffers(adminId: string) {
    await this.assertAdmin(adminId);
    return this.offerRepository.find({
      relations: ['enterprise', 'applications'],
      order: { createdAt: 'DESC' },
    });
  }

  async getAllApplications(adminId: string) {
    await this.assertAdmin(adminId);
    return this.applicationRepository.find({
      relations: ['student', 'student.user', 'offer', 'offer.enterprise'],
      order: { appliedAt: 'DESC' },
    });
  }

  async moderateOffer(adminId: string, offerId: string, status: OfferStatus) {
    await this.assertAdmin(adminId);

    const offer = await this.offerRepository.findOne({
      where: { id: offerId },
      relations: ['enterprise', 'enterprise.user', 'applications'],
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    offer.status = status;
    const savedOffer = await this.offerRepository.save(offer);

    if (offer.enterprise?.user?.id) {
      await this.notificationsService.create({
        userId: offer.enterprise.user.id,
        title: 'Statut de votre offre mis a jour',
        message: `Votre offre "${offer.title}" est maintenant "${this.mapOfferStatus(status)}".`,
        type: 'GENERAL',
        link: '/entreprise/offres',
      });
    }

    return savedOffer;
  }

  async verifyEnterprise(
    adminId: string,
    userId: string,
    isVerified: boolean,
    isSuspended?: boolean,
  ) {
    await this.assertAdmin(adminId);

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['enterpriseProfile'],
    });

    if (!user || user.role !== UserRole.ENTERPRISE) {
      throw new NotFoundException('Entreprise introuvable');
    }

    if (typeof isSuspended === 'boolean') {
      user.isSuspended = isSuspended;
      if (isSuspended === false) {
        user.isVerified = true;
      }
    } else {
      user.isVerified = isVerified;
    }
    const savedUser = await this.userRepository.save(user);

    await this.notificationsService.create({
      userId: savedUser.id,
      title: 'Verification entreprise mise a jour',
      message: this.buildEnterpriseModerationMessage(savedUser.isVerified, savedUser.isSuspended),
      type: 'GENERAL',
      link: '/entreprise/profil',
    });

    return savedUser;
  }

  async updateStudentSuspension(
    adminId: string,
    userId: string,
    isSuspended: boolean,
  ) {
    await this.assertAdmin(adminId);

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['studentProfile'],
    });

    if (!user || user.role !== UserRole.STUDENT) {
      throw new NotFoundException('Etudiant introuvable');
    }

    user.isSuspended = isSuspended;
    const savedUser = await this.userRepository.save(user);

    await this.notificationsService.create({
      userId: savedUser.id,
      title: 'Statut de compte mis a jour',
      message: isSuspended
        ? 'Votre compte etudiant a ete suspendu par un administrateur.'
        : 'Votre compte etudiant a ete reactive par un administrateur.',
      type: 'GENERAL',
      link: '/etudiant/parametres',
    });

    return savedUser;
  }

  private async getOrCreateSettings() {
    const existing = await this.adminSettingsRepository.find({
      order: { updatedAt: 'DESC', createdAt: 'DESC' },
    });
    if (existing.length > 0) {
      if (existing.length > 1) {
        const idsToDelete = existing.slice(1).map((row) => row.id);
        await this.adminSettingsRepository.delete(idsToDelete);
      }
      return existing[0];
    }
    const created = this.adminSettingsRepository.create({
      platformName: 'StageLink Burkina',
      supportEmail: 'support@stagelink.bf',
      seoDescription: 'La plateforme de reference pour connecter les talents du Burkina Faso avec les entreprises.',
      maintenanceMode: false,
      enable2faForAdmins: false,
      sessionExpiryHours: 24,
      notificationPreferences: {
        newStudent: true,
        newEnterprise: true,
        reportedOffer: true,
        applicationSubmitted: false,
        systemUpdate: true,
      },
    });
    return this.adminSettingsRepository.save(created);
  }

  async getSettings(adminId: string) {
    await this.assertAdmin(adminId);
    return this.getOrCreateSettings();
  }

  async updateSettings(adminId: string, patch: Partial<AdminSettings>) {
    await this.assertAdmin(adminId);
    const current = await this.getOrCreateSettings();
    const merged = this.adminSettingsRepository.merge(current, {
      platformName: patch.platformName ?? current.platformName,
      supportEmail: patch.supportEmail ?? current.supportEmail,
      seoDescription: patch.seoDescription ?? current.seoDescription,
      maintenanceMode: typeof patch.maintenanceMode === 'boolean' ? patch.maintenanceMode : current.maintenanceMode,
      enable2faForAdmins: typeof patch.enable2faForAdmins === 'boolean' ? patch.enable2faForAdmins : current.enable2faForAdmins,
      sessionExpiryHours: typeof patch.sessionExpiryHours === 'number' ? patch.sessionExpiryHours : current.sessionExpiryHours,
      notificationPreferences: patch.notificationPreferences
        ? { ...(current.notificationPreferences || {}), ...patch.notificationPreferences }
        : current.notificationPreferences,
    });
    return this.adminSettingsRepository.save(merged);
  }

  private mapOfferStatus(status: OfferStatus) {
    if (status === OfferStatus.ACTIVE) return 'active';
    if (status === OfferStatus.SIGNALEE) return 'signalee';
    if (status === OfferStatus.EXPIREE) return 'expiree';
    return 'en attente';
  }

  private buildEnterpriseModerationMessage(isVerified: boolean, isSuspended: boolean) {
    if (isSuspended) {
      return 'Votre compte entreprise a ete suspendu par un administrateur.';
    }
    if (isVerified) {
      return 'Votre compte entreprise a ete verifie et active.';
    }
    return 'Le statut de verification de votre compte entreprise a ete mis a jour.';
  }
}
