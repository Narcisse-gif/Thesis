import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { EnterpriseProfile } from '../../users/entities/enterprise-profile.entity';
import { Application } from '../../applications/entities/application.entity';

export enum ContractType {
  STAGE = 'STAGE',
  CDD = 'CDD',
  CDI = 'CDI',
}

export enum OfferStatus {
  ACTIVE = 'ACTIVE',
  EN_ATTENTE = 'EN_ATTENTE',
  EXPIREE = 'EXPIREE',
  SIGNALEE = 'SIGNALEE',
}

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: ContractType })
  contractType: ContractType;

  @Column({ type: 'enum', enum: OfferStatus, default: OfferStatus.EN_ATTENTE })
  status: OfferStatus;

  @Column({ nullable: true })
  salaryOrStipend: number;

  @Column()
  location: string;

  @Column('text')
  description: string;

  @Column('text')
  candidateProfile: string;

  @Column('simple-array', { nullable: true })
  requiredSkills: string[];

  // Spécificités selon le contrat
  @Column({ nullable: true })
  durationMonths: string; // CDD or Stage
  
  @Column({ nullable: true })
  possibleHiring: string; // Stage (Oui, Non, A définir)

  @Column({ nullable: true })
  minExperience: string; // CDD / CDI

  @Column('text', { nullable: true })
  benefits: string; // CDD / CDI (Avantages)

  @Column('simple-array', { nullable: true })
  requiredDocuments: string[];

  @Column({ type: 'date', nullable: true })
  applicationDeadline: Date;

  @ManyToOne(() => EnterpriseProfile, enterprise => enterprise.offers)
  enterprise: EnterpriseProfile;

  @OneToMany(() => Application, application => application.offer)
  applications: Application[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}