import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await this.prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  return { message: 'User created!', userId: user.id };
}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('User nahi mila!');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Password galat hai!');

    const token = this.jwtService.sign({ userId: user.id, email: user.email });
    return { token };
  }
}