import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { v4 as uuidv4 } from 'uuid'; // Pastikan Anda menginstal uuid

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Fungsi login untuk autentikasi user dan mengembalikan token JWT
  async login(email: string, password: string): Promise<AuthEntity> {
    // Logging DATABASE_URL untuk memastikan environment variable terbaca
    console.log(process.env.DATABASE_URL);

    const user = await this.prisma.users.findUnique({ where: { email } });

    if (!user) throw new NotFoundException(`No user found for email: ${email}`);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const payload = { userId: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // Permintaan untuk reset password tanpa memerlukan request body
  async requestPasswordReset() {
    const user = await this.prisma.users.findFirst();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = uuidv4(); // Menggunakan UUID sebagai token
    await this.prisma.passwordResetRequest.create({
      data: {
        userId: user.id,
        token: token,
        expiresAt: new Date(Date.now() + 3600000), // Token berlaku selama 1 jam
      },
    });

    // Logika untuk mengirim email (implementasi pengiriman email diperlukan)
    // await this.sendResetEmail(user.email, token);
  }

  // Reset password menggunakan `resetPasswordDto`
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const resetRequest = await this.prisma.passwordResetRequest.findUnique({
      where: { token: resetPasswordDto.token },
    });

    if (!resetRequest || resetRequest.expiresAt < new Date()) {
      throw new NotFoundException('Invalid or expired token');
    }

    const user = await this.prisma.users.findUnique({
      where: { id: resetRequest.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    await this.prisma.users.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Hapus permintaan reset setelah digunakan
    await this.prisma.passwordResetRequest.delete({
      where: { id: resetRequest.id },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(createAuthDto: CreateAuthDto) {
    // Implementasi untuk membuat user baru
  }

  async findAll() {
    // Implementasi untuk menemukan semua user
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findOne(id: number) {
    // Implementasi untuk menemukan user berdasarkan ID
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: number, updateAuthDto: UpdateAuthDto) {
    // Implementasi untuk memperbarui user berdasarkan ID
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: number) {
    // Implementasi untuk menghapus user berdasarkan ID
  }
}
