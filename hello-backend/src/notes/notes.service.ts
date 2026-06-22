import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.note.findMany({
      where: { userId },
    });
  }

  findOne(id: number) {
    return this.prisma.note.findUnique({ where: { id } });
  }

  create(data: { title: string; content: string }, userId: number) {
    return this.prisma.note.create({
      data: { ...data, userId },
    });
  }

  update(id: number, data: { title: string; content: string }) {
    return this.prisma.note.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.note.delete({ where: { id } });
  }
}