import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { User } from '../users/entities/user.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private notificationsService: NotificationsService,
  ) {}

  async sendMessage(senderId: string, receiverId: string, content: string, subject?: string) {
    const trimmedContent = (content || '').trim();
    if (!trimmedContent) {
      throw new BadRequestException('Message vide');
    }

    const sender = await this.userRepository.findOne({ where: { id: senderId } });
    const receiver = await this.userRepository.findOne({ where: { id: receiverId } });

    if (!sender || !receiver) throw new NotFoundException('Sender or Receiver not found');

    const message = this.messageRepository.create({
      sender,
      receiver,
      content: trimmedContent,
      subject: subject?.trim() || undefined,
    });
    const savedMessage = await this.messageRepository.save(message);

    await this.notificationsService.create({
      userId: receiver.id,
      title: 'Nouveau message',
      message: `Vous avez recu un nouveau message de ${sender.email}.`,
      type: 'MESSAGE',
      link:
        receiver.role === 'STUDENT'
          ? '/etudiant/messages'
          : receiver.role === 'ENTERPRISE'
            ? '/entreprise/messages'
            : '/admin/messages',
    });

    return savedMessage;
  }

  async getInbox(userId: string) {
    const messages = await this.messageRepository.find({
      where: [
        { sender: { id: userId } },
        { receiver: { id: userId } },
      ],
      relations: [
        'sender',
        'receiver',
        'sender.studentProfile',
        'receiver.studentProfile',
        'sender.enterpriseProfile',
        'receiver.enterpriseProfile',
      ],
      order: { createdAt: 'DESC' },
    });

    const threads = new Map<string, { otherUser: User; lastMessage: Message; unreadCount: number }>();

    for (const message of messages) {
      const isSender = message.sender.id === userId;
      const otherUser = isSender ? message.receiver : message.sender;
      const key = otherUser.id;

      const existing = threads.get(key);
      if (!existing) {
        threads.set(key, {
          otherUser,
          lastMessage: message,
          unreadCount: !isSender && !message.isRead ? 1 : 0,
        });
      } else {
        if (new Date(message.createdAt).getTime() > new Date(existing.lastMessage.createdAt).getTime()) {
          existing.lastMessage = message;
        }
        if (!isSender && !message.isRead) {
          existing.unreadCount += 1;
        }
      }
    }

    return Array.from(threads.values());
  }

  async getConversation(userId: string, otherUserId: string) {
    return this.messageRepository.find({
      where: [
        { sender: { id: userId }, receiver: { id: otherUserId } },
        { sender: { id: otherUserId }, receiver: { id: userId } },
      ],
      relations: [
        'sender',
        'receiver',
        'sender.studentProfile',
        'receiver.studentProfile',
        'sender.enterpriseProfile',
        'receiver.enterpriseProfile',
      ],
      order: { createdAt: 'ASC' },
    });
  }

  async markAsRead(messageId: string, userId: string) {
    const message = await this.messageRepository.findOne({
      where: { id: messageId, receiver: { id: userId } },
    });
    if (message) {
      message.isRead = true;
      return this.messageRepository.save(message);
    }
    return null;
  }

  async deleteMessage(messageId: string, userId: string) {
    const message = await this.messageRepository.findOne({
      where: { id: messageId },
      relations: ['sender', 'receiver'],
    });
    if (!message) {
      throw new NotFoundException('Message introuvable');
    }

    if (message.sender.id !== userId && message.receiver.id !== userId) {
      throw new ForbiddenException('Suppression non autorisee');
    }

    await this.messageRepository.delete(messageId);
    return { deleted: true };
  }
}
