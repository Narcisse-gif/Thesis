import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('student_profiles')
export class StudentProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  fieldOfStudy: string;

  @Column({ nullable: true })
  studyLevel: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  cvUrl: string;

  @Column('simple-array', { nullable: true })
  skills: string[];

  @OneToOne(() => User, user => user.studentProfile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}