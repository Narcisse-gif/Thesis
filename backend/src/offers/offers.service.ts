import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer, ContractType, OfferStatus } from './entities/offer.entity';
import { EnterpriseProfile } from '../users/entities/enterprise-profile.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    @InjectRepository(EnterpriseProfile)
    private enterpriseRepository: Repository<EnterpriseProfile>,
  ) {}

  async create(createOfferDto: any, userId: string): Promise<Offer> {
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
    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.contractType) where.contractType = query.contractType;
    
    return this.offersRepository.find({
      where,
      relations: ['enterprise'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { id },
      relations: ['enterprise'],
    });

    if (!offer) {
      throw new NotFoundException(`Offer #${id} not found`);
    }

    return offer;
  }

  async updateStatus(id: string, status: OfferStatus): Promise<Offer> {
    const offer = await this.findOne(id);
    offer.status = status;
    return this.offersRepository.save(offer);
  }
}
