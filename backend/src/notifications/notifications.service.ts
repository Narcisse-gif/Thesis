import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(input: {
    userId: string;
    title: string;
    message: string;
    type?: string;
    link?: string;
  }) {
    const user = await this.usersRepository.findOne({ where: { id: input.userId } });
    if (!user) {
      throw new NotFoundException(`User ${input.userId} not found`);
    }

    const notification = this.notificationsRepository.create({
      user,
      title: input.title,
      message: input.message,
      type: input.type || 'GENERAL',
      link: input.link,
    });

    return this.notificationsRepository.save(notification);
  }

  async createForRole(
    role: UserRole,
    input: {
      title: string;
      message: string;
      type?: string;
      link?: string;
    },
  ) {
    const users = await this.usersRepository.find({
      where: { role },
    });

    if (!users.length) {
      return [];
    }

    const notifications = users.map((user) =>
      this.notificationsRepository.create({
        user,
        title: input.title,
        message: input.message,
        type: input.type || 'GENERAL',
        link: input.link,
      }),
    );

    return this.notificationsRepository.save(notifications);
  }

  async findMine(userId: string) {
    return this.notificationsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      take: 100,
    });
  }

  async getUnreadCount(userId: string) {
    const count = await this.notificationsRepository.count({
      where: { user: { id: userId }, isRead: false },
    });

    return { count };
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await this.notificationsRepository.findOne({
      where: { id: notificationId, user: { id: userId } },
    });
    if (!notification) {
      throw new NotFoundException('Notification introuvable');
    }

    if (!notification.isRead) {
      notification.isRead = true;
      notification.readAt = new Date();
      await this.notificationsRepository.save(notification);
    }

    return notification;
  }

  async markAllAsRead(userId: string) {
    await this.notificationsRepository
      .createQueryBuilder()
      .update(Notification)
      .set({
        isRead: true,
        readAt: new Date(),
      })
      .where('"userId" = :userId', { userId })
      .andWhere('"isRead" = false')
      .execute();

    return { success: true };
  }

  async deleteOne(notificationId: string, userId: string) {
    const notification = await this.notificationsRepository.findOne({
      where: { id: notificationId, user: { id: userId } },
    });
    if (!notification) {
      throw new NotFoundException('Notification introuvable');
    }

    await this.notificationsRepository.delete(notification.id);
    return { deleted: true };
  }

  async deleteRead(userId: string) {
    await this.notificationsRepository
      .createQueryBuilder()
      .delete()
      .from(Notification)
      .where('"userId" = :userId', { userId })
      .andWhere('"isRead" = true')
      .execute();

    return { deleted: true };
  }
}
