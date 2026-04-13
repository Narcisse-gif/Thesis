import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity('enterprise_profiles')
export class EnterpriseProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyName: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  companySize: string;

  @Column({ nullable: true })
  website: string;

  @Column({ type: 'text', nullable: true })
  shortDescription: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  postalCode: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ nullable: true })
  bannerUrl: string;

  @Column({ nullable: true })
  cvUrl: string;

  @OneToOne(() => User, user => user.enterpriseProfile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => Offer, offer => offer.enterprise)
  offers: Offer[];
}