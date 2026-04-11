import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { StudentProfile } from './student-profile.entity';
import { EnterpriseProfile } from './enterprise-profile.entity';

export enum UserRole {
  STUDENT = 'STUDENT',
  ENTERPRISE = 'ENTERPRISE',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: false })
  isVerified: boolean;

  @OneToOne(() => StudentProfile, student => student.user, { cascade: true })
  studentProfile: StudentProfile;

  @OneToOne(() => EnterpriseProfile, enterprise => enterprise.user, { cascade: true })
  enterpriseProfile: EnterpriseProfile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}