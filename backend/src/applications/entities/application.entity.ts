import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { StudentProfile } from '../../users/entities/student-profile.entity';
import { Offer } from '../../offers/entities/offer.entity';

export enum ApplicationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  INTERVIEW = 'INTERVIEW',
}

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.PENDING })
  status: ApplicationStatus;

  @Column({ nullable: true })
  cvUrl: string;

  @Column({ type: 'text', nullable: true })
  coverLetterText: string;

  @Column({ nullable: true })
  portfolioUrl: string;

  @ManyToOne(() => StudentProfile)
  student: StudentProfile;

  @ManyToOne(() => Offer, offer => offer.applications)
  offer: Offer;

  @CreateDateColumn()
  appliedAt: Date;
}