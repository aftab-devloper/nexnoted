import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
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
  controllers: [AiController],
  providers: [AiService, JwtStrategy],
})
export class AiModule {}