import { Injectable, NotFoundException, BadRequestException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from './entities/application.entity';
import { Offer, OfferStatus } from '../offers/entities/offer.entity';
import { StudentProfile } from '../users/entities/student-profile.entity';
import { EnterpriseProfile } from '../users/entities/enterprise-profile.entity';
import { User, UserRole } from '../users/entities/user.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    @InjectRepository(StudentProfile)
    private studentRepository: Repository<StudentProfile>,
    @InjectRepository(EnterpriseProfile)
    private enterpriseRepository: Repository<EnterpriseProfile>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private notificationsService: NotificationsService,
  ) {}

  async applyToOffer(
    offerId: string,
    payload: any,
    userId: string,
    files?: { cv?: any[]; coverLetter?: any[] },
  ) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user || user.role !== UserRole.STUDENT) {
      throw new UnauthorizedException('Acces refuse');
    }
    if (user.isSuspended) {
      throw new ForbiddenException('Compte suspendu');
    }

    const student = await this.studentRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!student) {
      throw new NotFoundException(`Student profile not found for user ${userId}`);
    }

    const offer = await this.offersRepository.findOne({
      where: { id: offerId },
      relations: ['enterprise', 'enterprise.user'],
    });
    if (!offer) {
      throw new NotFoundException(`Offer #${offerId} not found`);
    }
    if (offer.status !== OfferStatus.ACTIVE) {
      throw new BadRequestException('Offre non disponible');
    }

    const existingApplication = await this.applicationsRepository.findOne({
      where: {
        student: { id: student.id },
        offer: { id: offer.id },
      },
      relations: ['student', 'offer'],
    });
    if (existingApplication) {
      throw new BadRequestException('Vous avez deja postule a cette offre');
    }

    const requiredDocuments = Array.isArray(offer.requiredDocuments) ? offer.requiredDocuments : [];
    const normalizedDocuments = requiredDocuments.filter((doc) => !doc.toLowerCase().includes('reference') && !doc.toLowerCase().includes('rÃ©fÃ©rence'));
    const requiresCv = normalizedDocuments.some((doc) => doc.toLowerCase().includes('cv'));
    const requiresCoverLetter = normalizedDocuments.some((doc) => doc.toLowerCase().includes('lettre'));

    const cvFile = files?.cv?.[0];
    const coverLetterFile = files?.coverLetter?.[0];

    if (requiresCv && !cvFile) {
      throw new BadRequestException('CV requis');
    }
    if (requiresCoverLetter && !coverLetterFile) {
      throw new BadRequestException('Lettre de motivation requise');
    }

    const application = this.applicationsRepository.create({
      status: ApplicationStatus.PENDING,
      cvUrl: payload?.cvUrl,
      coverLetterText: payload?.coverLetterText,
      portfolioUrl: payload?.portfolioUrl,
      cvFile: cvFile?.buffer,
      cvFileName: cvFile?.originalname,
      cvFileType: cvFile?.mimetype,
      coverLetterFile: coverLetterFile?.buffer,
      coverLetterFileName: coverLetterFile?.originalname,
      coverLetterFileType: coverLetterFile?.mimetype,
      student,
      offer,
    });

    const savedApplication = await this.applicationsRepository.save(application);

    await this.notificationsService.create({
      userId,
      title: 'Candidature envoyee',
      message: `Votre candidature pour "${offer.title}" a bien ete enregistree.`,
      type: 'APPLICATION',
      link: '/etudiant/candidatures',
    });

    if (offer.enterprise?.user?.id) {
      await this.notificationsService.create({
        userId: offer.enterprise.user.id,
        title: 'Nouvelle candidature',
        message: `Une nouvelle candidature a ete recue pour "${offer.title}".`,
        type: 'APPLICATION',
        link: '/entreprise/candidats',
      });
    }

    return savedApplication;
  }

  async getMyApplications(userId: string) {
    const student = await this.studentRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!student) {
      throw new NotFoundException(`Student profile not found for user ${userId}`);
    }

    return this.applicationsRepository.find({
      where: { student: { id: student.id } },
      relations: ['offer', 'offer.enterprise'],
      order: { appliedAt: 'DESC' },
    });
  }

  async getEnterpriseApplications(userId: string) {
    const enterprise = await this.enterpriseRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!enterprise) {
      throw new NotFoundException(`Enterprise profile not found for user ${userId}`);
    }

    return this.applicationsRepository.find({
      where: { offer: { enterprise: { id: enterprise.id } } },
      relations: ['student', 'student.user', 'offer', 'offer.enterprise'],
      order: { appliedAt: 'DESC' },
    });
  }

  async updateStatus(applicationId: string, status: ApplicationStatus, userId: string) {
    const enterprise = await this.enterpriseRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!enterprise) {
      throw new NotFoundException(`Enterprise profile not found for user ${userId}`);
    }

    const application = await this.applicationsRepository.findOne({
      where: { id: applicationId },
      relations: ['offer', 'offer.enterprise', 'student', 'student.user'],
    });
    if (!application) {
      throw new NotFoundException(`Application #${applicationId} not found`);
    }

    if (application.offer?.enterprise?.id !== enterprise.id) {
      throw new ForbiddenException('Acces refuse');
    }

    application.status = status;
    const savedApplication = await this.applicationsRepository.save(application);

    if (application.student?.user?.id) {
      await this.notificationsService.create({
        userId: application.student.user.id,
        title: 'Statut de candidature mis a jour',
        message: `Votre candidature pour "${application.offer.title}" est maintenant "${this.mapApplicationStatus(status)}".`,
        type: 'APPLICATION',
        link: '/etudiant/candidatures',
      });
    }

    return savedApplication;
  }

  async getApplicantProfile(applicationId: string, userId: string) {
    const enterprise = await this.enterpriseRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!enterprise) {
      throw new NotFoundException(`Enterprise profile not found for user ${userId}`);
    }

    const application = await this.applicationsRepository.findOne({
      where: { id: applicationId },
      relations: ['student', 'student.user', 'offer', 'offer.enterprise'],
    });
    if (!application) {
      throw new NotFoundException(`Application #${applicationId} not found`);
    }

    if (application.offer?.enterprise?.id !== enterprise.id) {
      throw new ForbiddenException('Acces refuse');
    }

    const user = application.student?.user;
    if (!user) {
      throw new NotFoundException('Student not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safeUser } = user;
    return {
      ...safeUser,
      studentProfile: application.student,
    };
  }

  private mapApplicationStatus(status: ApplicationStatus) {
    if (status === ApplicationStatus.ACCEPTED) return 'acceptee';
    if (status === ApplicationStatus.REJECTED) return 'rejetee';
    if (status === ApplicationStatus.INTERVIEW) return 'en entretien';
    return 'en attente';
  }
}
