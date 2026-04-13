import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('admin_settings')
export class AdminSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 'StageLink Burkina' })
  platformName: string;

  @Column({ default: 'support@stagelink.bf' })
  supportEmail: string;

  @Column({ type: 'text', nullable: true })
  seoDescription: string | null;

  @Column({ default: false })
  maintenanceMode: boolean;

  @Column({ default: false })
  enable2faForAdmins: boolean;

  @Column({ default: 24 })
  sessionExpiryHours: number;

  @Column({ type: 'jsonb', nullable: true })
  notificationPreferences: Record<string, boolean> | null;
}
