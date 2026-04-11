import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { StudentProfile } from './entities/student-profile.entity';
import { EnterpriseProfile } from './entities/enterprise-profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(StudentProfile) private studentRepository: Repository<StudentProfile>,
    @InjectRepository(EnterpriseProfile) private enterpriseRepository: Repository<EnterpriseProfile>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ 
      where: { email }, 
      relations: ['studentProfile', 'enterpriseProfile'] 
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['studentProfile', 'enterpriseProfile']
    });
  }

  async create(userData: DeepPartial<User>, profileData: any): Promise<User> {
    if (!userData.email) {
      throw new ConflictException('Email is required');
    }
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = this.usersRepository.create(userData);

    if (user.role === UserRole.STUDENT) {
      const student = this.studentRepository.create({
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
      });
      user.studentProfile = student;
    } else if (user.role === UserRole.ENTERPRISE) {
      const enterprise = this.enterpriseRepository.create({
        companyName: profileData.companyName || '',
      });
      user.enterpriseProfile = enterprise;
    }

    return this.usersRepository.save(user);
  }

  async getProfile(userId: string) {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async updateProfile(userId: string, updateData: any) {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    if (user.role === UserRole.STUDENT && user.studentProfile) {
      Object.assign(user.studentProfile, updateData);
      await this.studentRepository.save(user.studentProfile);
    } else if (user.role === UserRole.ENTERPRISE && user.enterpriseProfile) {
      Object.assign(user.enterpriseProfile, updateData);
      await this.enterpriseRepository.save(user.enterpriseProfile);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...updatedSavedUser } = await this.usersRepository.save(user);
    return updatedSavedUser;
  }
}