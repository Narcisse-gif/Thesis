import { Injectable, NotFoundException, BadRequestException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from './entities/application.entity';
import { Offer, OfferStatus } from '../offers/entities/offer.entity';
import { StudentProfile } from '../users/entities/student-profile.entity';
import { EnterpriseProfile } from '../users/entities/enterprise-profile.entity';
import { User, UserRole } from '../users/entities/user.entity';

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
      relations: ['enterprise'],
    });
    if (!offer) {
      throw new NotFoundException(`Offer #${offerId} not found`);
    }
    if (offer.status !== OfferStatus.ACTIVE) {
      throw new BadRequestException('Offre non disponible');
    }

    const requiredDocuments = Array.isArray(offer.requiredDocuments) ? offer.requiredDocuments : [];
    const normalizedDocuments = requiredDocuments.filter((doc) => !doc.toLowerCase().includes('reference') && !doc.toLowerCase().includes('référence'));
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

    return this.applicationsRepository.save(application);
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
      relations: ['offer', 'offer.enterprise'],
    });
    if (!application) {
      throw new NotFoundException(`Application #${applicationId} not found`);
    }

    if (application.offer?.enterprise?.id !== enterprise.id) {
      throw new ForbiddenException('Acces refuse');
    }

    application.status = status;
    return this.applicationsRepository.save(application);
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
}