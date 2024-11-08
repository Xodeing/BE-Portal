import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoogleService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  // Menangani validasi login dengan Google dan pembuatan pengguna baru jika tidak ada
  async validateOAuthLogin(userData: any): Promise<any> {
    let user = await this.prisma.users.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      // Membuat pengguna baru jika belum ada
      user = await this.prisma.users.create({
        data: {
          email: userData.email,
          googleId: userData.googleId,
          userProfileId: {},  // Atur sesuai kebutuhan
          userName: `${userData.firstName} ${userData.lastName}`,
          password: '',
          status: true,
          role: {
            connect: { id: 2 },
          },
        },
      });
    }

    // Membuat JWT token untuk pengguna yang berhasil diverifikasi
    const payload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload);

    // Menyusun respons sesuai format yang diminta
    return {
      message: 'Login ke Eventives',
      email: user.email,
      info: 'Dengan melanjutkan, Google akan membagikan nama, alamat email, preferensi bahasa, dan foto profil Anda ke hostinger.com. Lihat Kebijakan Privasi dan Persyaratan Layanan hostinger.com. Anda dapat mengelola Login dengan Google di Akun Google Anda.',
      accessToken,  // Mengirimkan access token
    };
  }

  // Login dengan Google dan memberikan token akses
  async loginWithGoogle(user: any) {
    const payload = { username: user.email, sub: user.userId };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Login ke Eventives',
      email: user.email,
      info: 'Dengan melanjutkan, Google akan membagikan nama, alamat email, preferensi bahasa, dan foto profil Anda ke hostinger.com. Lihat Kebijakan Privasi dan Persyaratan Layanan hostinger.com. Anda dapat mengelola Login dengan Google di Akun Google Anda.',
      accessToken,  // Mengirimkan access token
    };
  }
}
