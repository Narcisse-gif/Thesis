import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Offer, ContractType, OfferStatus } from './entities/offer.entity';
import { EnterpriseProfile } from '../users/entities/enterprise-profile.entity';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    @InjectRepository(EnterpriseProfile)
    private enterpriseRepository: Repository<EnterpriseProfile>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createOfferDto: any, userId: string): Promise<Offer> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user || user.role !== UserRole.ENTERPRISE) {
      throw new ForbiddenException('Acces refuse');
    }
    if (user.isSuspended || !user.isVerified) {
      throw new ForbiddenException('Entreprise non verifiee ou suspendue');
    }

    const enterprise = await this.enterpriseRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!enterprise) {
      throw new NotFoundException(`Enterprise profile not found for user ${userId}`);
    }

    const offer = new Offer();
    Object.assign(offer, createOfferDto);
    offer.enterprise = enterprise;

    return this.offersRepository.save(offer);
  }

  async findAll(query?: any): Promise<Offer[]> {
    // Possibilité d'ajouter des filtres de type, localisation, statut
    const qb = this.offersRepository
      .createQueryBuilder('offer')
      .leftJoinAndSelect('offer.enterprise', 'enterprise');

    if (query?.status) {
      const statuses = String(query.status).split(',').map((value) => value.trim()).filter(Boolean);
      if (statuses.length > 1) {
        qb.andWhere('offer.status IN (:...statuses)', { statuses });
      } else if (statuses.length === 1) {
        qb.andWhere('offer.status = :status', { status: statuses[0] });
      }
    }

    if (query?.contractType) {
      const contractTypes = String(query.contractType).split(',').map((value) => value.trim()).filter(Boolean);
      if (contractTypes.length > 1) {
        qb.andWhere('offer.contractType IN (:...contractTypes)', { contractTypes });
      } else if (contractTypes.length === 1) {
        qb.andWhere('offer.contractType = :contractType', { contractType: contractTypes[0] });
      }
    }

    if (query?.location) {
      qb.andWhere('LOWER(offer.location) LIKE :location', {
        location: `%${String(query.location).toLowerCase()}%`,
      });
    }

    if (query?.industry) {
      qb.andWhere('LOWER(enterprise.industry) LIKE :industry', {
        industry: `%${String(query.industry).toLowerCase()}%`,
      });
    }

    if (query?.q) {
      const value = `%${String(query.q).toLowerCase()}%`;
      qb.andWhere(new Brackets((subQb) => {
        subQb
          .where('LOWER(offer.title) LIKE :q', { q: value })
          .orWhere('LOWER(offer.description) LIKE :q', { q: value })
          .orWhere('LOWER(offer.candidateProfile) LIKE :q', { q: value })
          .orWhere('LOWER(enterprise.companyName) LIKE :q', { q: value });
      }));
    }

    if (query?.sort === 'oldest') {
      qb.orderBy('offer.createdAt', 'ASC');
    } else {
      qb.orderBy('offer.createdAt', 'DESC');
    }

    const offers = await qb.getMany();
    await this.expirePastDeadlineOffers(offers);
    return offers;
  }

  async findMine(userId: string): Promise<Offer[]> {
    const enterprise = await this.enterpriseRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!enterprise) {
      throw new NotFoundException(`Enterprise profile not found for user ${userId}`);
    }

    const offers = await this.offersRepository.find({
      where: { enterprise: { id: enterprise.id } },
      relations: ['enterprise', 'applications'],
      order: { createdAt: 'DESC' },
    });
    await this.expirePastDeadlineOffers(offers);
    return offers;
  }

  async findOne(id: string): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { id },
      relations: ['enterprise', 'applications'],
    });

    if (!offer) {
      throw new NotFoundException(`Offer #${id} not found`);
    }

    await this.expirePastDeadlineOffers([offer]);

    return offer;
  }

  async updateStatus(id: string, status: OfferStatus): Promise<Offer> {
    const offer = await this.findOne(id);
    offer.status = status;
    return this.offersRepository.save(offer);
  }

  async updateOffer(id: string, updateDto: any, userId: string): Promise<Offer> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user || user.role !== UserRole.ENTERPRISE) {
      throw new ForbiddenException('Acces refuse');
    }

    const enterprise = await this.enterpriseRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!enterprise) {
      throw new NotFoundException(`Enterprise profile not found for user ${userId}`);
    }

    const offer = await this.offersRepository.findOne({
      where: { id },
      relations: ['enterprise'],
    });

    if (!offer) {
      throw new NotFoundException(`Offer #${id} not found`);
    }

    if (offer.enterprise?.id !== enterprise.id) {
      throw new ForbiddenException('Acces refuse');
    }

    const allowedFields = [
      'title',
      'salaryOrStipend',
      'location',
      'durationMonths',
      'possibleHiring',
      'minExperience',
      'description',
      'candidateProfile',
      'studyLevel',
      'benefits',
      'requiredSkills',
      'requiredDocuments',
      'applicationDeadline',
      'contractType',
    ];

    allowedFields.forEach((field) => {
      if (updateDto[field] !== undefined) {
        (offer as any)[field] = updateDto[field];
      }
    });

    return this.offersRepository.save(offer);
  }

  async removeOffer(id: string, userId: string): Promise<{ success: boolean }> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user || user.role !== UserRole.ENTERPRISE) {
      throw new ForbiddenException('Acces refuse');
    }

    const enterprise = await this.enterpriseRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!enterprise) {
      throw new NotFoundException(`Enterprise profile not found for user ${userId}`);
    }

    const offer = await this.offersRepository.findOne({
      where: { id },
      relations: ['enterprise'],
    });

    if (!offer) {
      throw new NotFoundException(`Offer #${id} not found`);
    }

    if (offer.enterprise?.id !== enterprise.id) {
      throw new ForbiddenException('Acces refuse');
    }

    await this.offersRepository.remove(offer);
    return { success: true };
  }

  private async expirePastDeadlineOffers(offers: Offer[]): Promise<void> {
    if (!offers.length) return;
    const now = new Date();
    const toExpire = offers.filter((offer) => {
      if (!offer.applicationDeadline) return false;
      if (offer.status === OfferStatus.EXPIREE) return false;
      return new Date(offer.applicationDeadline) < now;
    });

    if (!toExpire.length) return;
    await Promise.all(
      toExpire.map((offer) => {
        offer.status = OfferStatus.EXPIREE;
        return this.offersRepository.save(offer);
      }),
    );
  }
}
