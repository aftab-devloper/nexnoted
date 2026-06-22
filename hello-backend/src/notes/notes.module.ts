import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { PrismaService } from '../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'nexnotes-secret-key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [NotesController],
  providers: [NotesService, PrismaService, JwtStrategy],
})
export class NotesModule {}