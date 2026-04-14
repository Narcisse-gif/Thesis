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
        fieldOfStudy: profileData.fieldOfStudy || '',
        studyLevel: profileData.studyLevel || '',
        university: profileData.university || '',
        phoneNumber: profileData.phoneNumber || '',
        location: profileData.location || '',
      });
      user.studentProfile = student;
    } else if (user.role === UserRole.ENTERPRISE) {
      const enterprise = this.enterpriseRepository.create({
        companyName: profileData.companyName || '',
        industry: profileData.industry || '',
        companySize: profileData.companySize || '',
        website: profileData.website || '',
        location: profileData.location || '',
        shortDescription: profileData.shortDescription || '',
        phoneNumber: profileData.phoneNumber || '',
        address: profileData.address || '',
        postalCode: profileData.postalCode || '',
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

  async getStudentProfileByIdentifier(identifier: string) {
    const user = await this.usersRepository.findOne({
      where: { id: identifier },
      relations: ['studentProfile'],
    });
    if (user && user.role === UserRole.STUDENT) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...safeUser } = user;
      return safeUser;
    }

    const student = await this.studentRepository.findOne({
      where: { id: identifier },
      relations: ['user'],
    });
    if (!student?.user || student.user.role !== UserRole.STUDENT) {
      throw new NotFoundException('Student not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safeUser } = student.user;
    return safeUser;
  }

  async updateProfile(userId: string, updateData: any) {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const { avatarUrl, ...profileData } = updateData || {};

    if (typeof avatarUrl === 'string') {
      user.avatarUrl = avatarUrl;
    }

    if (user.role === UserRole.STUDENT && user.studentProfile) {
      Object.assign(user.studentProfile, profileData);
      await this.studentRepository.save(user.studentProfile);
    } else if (user.role === UserRole.ENTERPRISE && user.enterpriseProfile) {
      Object.assign(user.enterpriseProfile, profileData);
      await this.enterpriseRepository.save(user.enterpriseProfile);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...updatedSavedUser } = await this.usersRepository.save(user);
    return updatedSavedUser;
  }

  async updateAuth(
    userId: string,
    data: { email?: string; passwordHash?: string; resetPasswordToken?: string | null; resetPasswordExpiresAt?: Date | null },
  ) {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    if (data.email) {
      const existing = await this.findByEmail(data.email);
      if (existing && existing.id !== user.id) {
        throw new ConflictException('User with this email already exists');
      }
      user.email = data.email;
    }

    if (data.passwordHash) {
      user.passwordHash = data.passwordHash;
    }

    if (data.resetPasswordToken !== undefined) {
      user.resetPasswordToken = data.resetPasswordToken;
    }

    if (data.resetPasswordExpiresAt !== undefined) {
      user.resetPasswordExpiresAt = data.resetPasswordExpiresAt;
    }

    return this.usersRepository.save(user);
  }

  async findByResetToken(token: string) {
    return this.usersRepository.findOne({ where: { resetPasswordToken: token } });
  }

  async searchUsers(query: string, role: UserRole, limit = 10) {
    const trimmed = (query || '').trim();
    if (!trimmed) return [];

    const qb = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.studentProfile', 'studentProfile')
      .leftJoinAndSelect('user.enterpriseProfile', 'enterpriseProfile')
      .where('user.role = :role', { role })
      .take(limit);

    const pattern = `%${trimmed}%`;
    if (role === UserRole.STUDENT) {
      qb.andWhere(
        '(user.email ILIKE :pattern OR studentProfile.firstName ILIKE :pattern OR studentProfile.lastName ILIKE :pattern)',
        { pattern },
      );
    } else if (role === UserRole.ENTERPRISE) {
      qb.andWhere(
        '(user.email ILIKE :pattern OR enterpriseProfile.companyName ILIKE :pattern)',
        { pattern },
      );
    }

    const users = await qb.getMany();
    return users.map((user) => {
      const displayName =
        user.role === UserRole.STUDENT
          ? `${user.studentProfile?.firstName || ''} ${user.studentProfile?.lastName || ''}`.trim()
          : user.enterpriseProfile?.companyName || '';

      return {
        id: user.id,
        email: user.email,
        role: user.role,
        displayName,
      };
    });
  }
}