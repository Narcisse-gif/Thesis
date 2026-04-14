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

  @Column({ type: 'bytea', nullable: true, select: false })
  cvFile: Buffer;

  @Column({ nullable: true })
  cvFileName: string;

  @Column({ nullable: true })
  cvFileType: string;

  @Column({ type: 'text', nullable: true })
  coverLetterText: string;

  @Column({ type: 'bytea', nullable: true, select: false })
  coverLetterFile: Buffer;

  @Column({ nullable: true })
  coverLetterFileName: string;

  @Column({ nullable: true })
  coverLetterFileType: string;

  @Column({ nullable: true })
  portfolioUrl: string;

  @Column({ type: 'bytea', nullable: true, select: false })
  referencesFile: Buffer;

  @Column({ nullable: true })
  referencesFileName: string;

  @Column({ nullable: true })
  referencesFileType: string;

  @ManyToOne(() => StudentProfile)
  student: StudentProfile;

  @ManyToOne(() => Offer, offer => offer.applications)
  offer: Offer;

  @CreateDateColumn()
  appliedAt: Date;
}