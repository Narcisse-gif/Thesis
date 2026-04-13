import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnterpriseProfile } from './entities/enterprise-profile.entity';
import { Offer, OfferStatus } from '../offers/entities/offer.entity';

@Injectable()
export class EnterprisesService {
  constructor(
    @InjectRepository(EnterpriseProfile)
    private enterpriseRepository: Repository<EnterpriseProfile>,
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
  ) {}

  async list(search?: string) {
    const normalizedSearch = search?.trim();
    const query = this.enterpriseRepository
      .createQueryBuilder('enterprise')
      .leftJoin('enterprise.offers', 'offer')
      .select('enterprise')
      .addSelect('COUNT(offer.id)', 'offersCount')
      .addSelect(
        'SUM(CASE WHEN offer.status = :activeStatus THEN 1 ELSE 0 END)',
        'activeOffersCount',
      )
      .setParameter('activeStatus', OfferStatus.ACTIVE)
      .groupBy('enterprise.id')
      .orderBy('enterprise.companyName', 'ASC');

    if (normalizedSearch) {
      query.where(
        'enterprise.companyName ILIKE :search OR enterprise.industry ILIKE :search OR enterprise.location ILIKE :search',
        { search: `%${normalizedSearch}%` },
      );
    }

    const { entities, raw } = await query.getRawAndEntities();

    return entities.map((enterprise, index) => ({
      ...enterprise,
      offersCount: Number(raw[index]?.offersCount || 0),
      activeOffersCount: Number(raw[index]?.activeOffersCount || 0),
    }));
  }

  async getOne(id: string, includeAllOffers = false) {
    const enterprise = await this.enterpriseRepository.findOne({ where: { id } });

    if (!enterprise) {
      throw new NotFoundException(`Enterprise ${id} not found`);
    }

    const offersQuery = includeAllOffers
      ? { enterprise: { id } }
      : { enterprise: { id }, status: OfferStatus.ACTIVE };

    const offers = await this.offersRepository.find({
      where: offersQuery,
      order: { createdAt: 'DESC' },
    });

    const offersCount = await this.offersRepository.count({
      where: { enterprise: { id } },
    });

    const activeOffersCount = await this.offersRepository.count({
      where: { enterprise: { id }, status: OfferStatus.ACTIVE },
    });

    return {
      enterprise,
      offers,
      offersCount,
      activeOffersCount,
    };
  }
}
