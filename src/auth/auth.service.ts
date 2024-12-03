import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import { randomBytes } from 'crypto';
import { addHours } from 'date-fns';
import * as argon2 from 'argon2'; // Import argon2

@Injectable()
export class AuthService {
  mail: any;
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Fungsi login untuk autentikasi user dan mengembalikan token JWT
  async login(email: string, password: string): Promise<AuthEntity> {
    console.log(process.env.DATABASE_URL);

    const user = await this.prisma.users.findUnique({ where: { email } });

    if (!user) throw new NotFoundException(`No user found for email: ${email}`);

    // Menggunakan argon2 untuk memverifikasi password
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const payload = { userId: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // Permintaan untuk reset password tanpa memerlukan request body
  async requestPasswordReset(email: string) {
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const token = randomBytes(32).toString('hex');
    await this.prisma.token.create({
      data: {
        userId: user.id,
        token,
        createdAt: new Date(),
      },
    });

    const resetLink = `http://localhost:3000?token=${token}`;

    try {
      await this.mail.sendMail({
        to: email,
        subject: 'Password Reset',
        html: `Click <a href="${resetLink}">here</a> to reset your password`,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Failed to send password reset email');
    }

    return { message: 'A password reset link has been sent to your email.' };
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenRecord = await this.prisma.token.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!tokenRecord) {
      throw new NotFoundException('Invalid or expired token');
    }

    const expiry = addHours(tokenRecord.createdAt, 2);
    if (new Date() > expiry) {
      throw new NotFoundException('Token expired');
    }

    // Menggunakan argon2 untuk hash password baru
    const hashedPassword = await argon2.hash(newPassword);
    await this.prisma.users.update({
      where: { id: tokenRecord.userId },
      data: { password: hashedPassword },
    });

    await this.prisma.token.delete({ where: { id: tokenRecord.id } });

    return { message: 'Password reset successfully' };
  }
}
