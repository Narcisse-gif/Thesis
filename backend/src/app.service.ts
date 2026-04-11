import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './users/entities/user.entity';
import { StudentProfile } from './users/entities/student-profile.entity';
import { EnterpriseProfile } from './users/entities/enterprise-profile.entity';
import { Offer, ContractType, OfferStatus } from './offers/entities/offer.entity';
import { Application, ApplicationStatus } from './applications/entities/application.entity';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager() private readonly em: EntityManager) {}

  getHello(): string {
    return 'Stagelink API Running';
  }

  async seedDatabase() {
    console.log('Seeding database...');
    // Drop logic
    await this.em.query('TRUNCATE TABLE applications, offers, student_profiles, enterprise_profiles, users CASCADE;');

    const pwd = await bcrypt.hash('password123', 10);

    // 1. Admin
    const admin = this.em.create(User, {
      email: 'admin@stagelink.bf',
      passwordHash: pwd,
      role: UserRole.ADMIN,
      isVerified: true,
    });
    await this.em.save(admin);

    // 2. Enterprise
    const ent1 = this.em.create(User, { email: 'rh@orange.bf', passwordHash: pwd, role: UserRole.ENTERPRISE, isVerified: true });
    const ent2 = this.em.create(User, { email: 'jobs@coris.bf', passwordHash: pwd, role: UserRole.ENTERPRISE, isVerified: true });
    const ent3 = this.em.create(User, { email: 'recrutement@sonabel.bf', passwordHash: pwd, role: UserRole.ENTERPRISE, isVerified: true });
    await this.em.save([ent1, ent2, ent3]);

    const entProf1 = this.em.create(EnterpriseProfile, {
      user: ent1, companyName: 'Orange Burkina', industry: 'TÃ©lÃ©com', companySize: '1000+', location: 'Ouagadougou', logoUrl: 'https://logo.clearbit.com/orange.com'
    });
    const entProf2 = this.em.create(EnterpriseProfile, {
      user: ent2, companyName: 'Coris Bank', industry: 'Banque', companySize: '500+', location: 'Bobo-Dioulasso', logoUrl: 'https://logo.clearbit.com/corisbankinternational.com'
    });
    const entProf3 = this.em.create(EnterpriseProfile, {
      user: ent3, companyName: 'SONABEL', industry: 'Energie', companySize: '1000+', location: 'Ouagadougou', logoUrl: 'https://logo.clearbit.com/sonabel.bf'
    });
    await this.em.save([entProf1, entProf2, entProf3]);

    // 3. Student
    const stu1 = this.em.create(User, { email: 'awa.ouedraogo@student.bf', passwordHash: pwd, role: UserRole.STUDENT, isVerified: true });
    const stu2 = this.em.create(User, { email: 'jean.kabore@student.bf', passwordHash: pwd, role: UserRole.STUDENT, isVerified: true });
    const stu3 = this.em.create(User, { email: 'fatou.traore@student.bf', passwordHash: pwd, role: UserRole.STUDENT, isVerified: true });
    const stu4 = this.em.create(User, { email: 'moussa.dao@student.bf', passwordHash: pwd, role: UserRole.STUDENT, isVerified: true });
    await this.em.save([stu1, stu2, stu3, stu4]);

    const stP1 = this.em.create(StudentProfile, { user: stu1, firstName: 'Awa', lastName: 'Ouedraogo', university: 'Universite Joseph Ki-Zerbo', fieldOfStudy: 'Informatique', studyLevel: 'Master 2', location: 'Ouagadougou' });
    const stP2 = this.em.create(StudentProfile, { user: stu2, firstName: 'Jean', lastName: 'Kabore', university: 'Aube Nouvelle', fieldOfStudy: 'GÃ©nie Logiciel', studyLevel: 'Master 1', location: 'Ouagadougou' });
    const stP3 = this.em.create(StudentProfile, { user: stu3, firstName: 'Fatou', lastName: 'Traore', university: 'IAM Ouagadougou', fieldOfStudy: 'Marketing Digital', studyLevel: 'Licence 3', location: 'Bobo-Dioulasso' });
    const stP4 = this.em.create(StudentProfile, { user: stu4, firstName: 'Moussa', lastName: 'Dao', university: 'ESI / Bobo', fieldOfStudy: 'GÃ©nie Civil', studyLevel: 'Master 2', location: 'Bobo-Dioulasso' });
    await this.em.save([stP1, stP2, stP3, stP4]);

    // 4. Offers
    const off1 = this.em.create(Offer, {
      title: 'Developpeur Full-stack Junior', contractType: ContractType.CDI, status: OfferStatus.ACTIVE, location: 'Ouagadougou',
      description: 'Nous cherchons un dev React/Nest.', candidateProfile: 'MotivÃ©', requiredDocuments: ['CV'], enterprise: entProf1
    });
    const off2 = this.em.create(Offer, {
      title: 'Stage en Cybersecurite', contractType: ContractType.STAGE, status: OfferStatus.ACTIVE, location: 'Bobo-Dioulasso',
      description: 'Test de pÃ©nÃ©tration.', candidateProfile: 'Bac+4 min.', requiredDocuments: ['CV', 'Lettre de motivation'], enterprise: entProf2, durationMonths: '6'
    });
    const off3 = this.em.create(Offer, {
      title: 'Assistant Marketing', contractType: ContractType.STAGE, status: OfferStatus.ACTIVE, location: 'Bobo-Dioulasso',
      description: 'Aide a la comm.', candidateProfile: 'Dynamique', requiredDocuments: ['CV'], enterprise: entProf2
    });
    const off4 = this.em.create(Offer, {
      title: 'Support IT (Maintenance)', contractType: ContractType.CDD, status: OfferStatus.ACTIVE, location: 'Ouagadougou',
      description: 'Installation materielle', candidateProfile: 'Technicien Superieur', requiredDocuments: ['CV'], enterprise: entProf3, durationMonths: '12'
    });
    // Create an expired one
    const off5 = this.em.create(Offer, {
      title: 'Data Analyst', contractType: ContractType.STAGE, status: OfferStatus.EXPIREE, location: 'Ouagadougou',
      description: 'Expired offer.', candidateProfile: 'Master Data', requiredDocuments: ['CV'], enterprise: entProf1
    });
    await this.em.save([off1, off2, off3, off4, off5]);

    // 5. Applications (Student -> Offer)
    const app1 = this.em.create(Application, { student: stP1, offer: off1, status: ApplicationStatus.INTERVIEW, coverLetterText: 'Super motivÃ©e', cvUrl: 'https://cv.com/awa' });
    const app2 = this.em.create(Application, { student: stP2, offer: off1, status: ApplicationStatus.REJECTED, coverLetterText: 'Voila mon CV', cvUrl: 'https://cv.com/jean' });
    const app3 = this.em.create(Application, { student: stP3, offer: off3, status: ApplicationStatus.PENDING, coverLetterText: 'PrÃªte pour le marketing', cvUrl: 'https://cv.com/fatou' });
    const app4 = this.em.create(Application, { student: stP4, offer: off4, status: ApplicationStatus.ACCEPTED, coverLetterText: 'Super technicien', cvUrl: 'https://cv.com/moussa' });
    const app5 = this.em.create(Application, { student: stP1, offer: off2, status: ApplicationStatus.PENDING, coverLetterText: 'DÃ©jÃ  passionnÃ© de sÃ©cu', cvUrl: 'https://cv.com/awa' });
    const app6 = this.em.create(Application, { student: stP2, offer: off5, status: ApplicationStatus.REJECTED, coverLetterText: 'Data analyst expert', cvUrl: 'https://cv.com/jean' });
    
    app1.appliedAt = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); 
    app2.appliedAt = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
    app3.appliedAt = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
    app4.appliedAt = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

    await this.em.save([app1, app2, app3, app4, app5, app6]);

    return {
      message: 'Base de donnees reinitialisee et remplie avec succes!',
      credentials: {
        admin: 'admin@stagelink.bf / password123',
        enterprise1: 'rh@orange.bf / password123',
        enterprise2: 'jobs@coris.bf / password123',
        enterprise3: 'recrutement@sonabel.bf / password123',
        student1: 'awa.ouedraogo@student.bf / password123',
        student2: 'jean.kabore@student.bf / password123',
        student3: 'fatou.traore@student.bf / password123',
        student4: 'moussa.dao@student.bf / password123'
      }
    };
  }

  async clearOffersData() {
    await this.em.query('TRUNCATE TABLE applications, favorites, offers CASCADE;');
    return { message: 'Offres, candidatures et favoris supprimés.' };
  }
}
