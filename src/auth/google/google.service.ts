import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class GoogleService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  // Ambil data pengguna Google menggunakan kode otorisasi
  async getGoogleUserData(code: string) {
    try {
      const tokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: 'http://localhost:3000/auth/google/callback', // Pastikan URL ini benar
          grant_type: 'authorization_code',
        },
      );

      const { access_token } = tokenResponse.data;

      const userResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      );

      return userResponse.data;
    } catch (error) {
      console.error('Error fetching Google user data:', error);
      throw new BadRequestException('Gagal mengambil data pengguna Google');
    }
  }

  // Validasi pengguna atau buat pengguna baru
  async validateOAuthLogin(userData: any): Promise<any> {
    let user = await this.prisma.users.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      user = await this.prisma.users.create({
        data: {
          email: userData.email,
          googleId: userData.id, // Menggunakan ID dari Google
          userProfileId: null, // Atur sesuai kebutuhan atau relasi yang tepat
          userName:
            userData.name || `${userData.given_name} ${userData.family_name}`, // Nama lengkap atau kombinasi
          password: '', // Kosongkan karena menggunakan OAuth
          status: true, // Status aktif
          role: {
            connect: { id: 2 }, // Role default (sesuaikan dengan database Anda)
          },
        },
      });
    }

    const payload = { userId: user.id };
    return {
      accessToken: this.jwtService.sign(payload), // Generate JWT untuk user
    };
  }

  // Login dengan Google (dari kode otorisasi)
  async loginWithGoogle(code: string): Promise<{ accessToken: string }> {
    // Ambil data pengguna dari Google
    const googleUserData = await this.getGoogleUserData(code);

    // Validasi user atau buat user baru jika belum ada
    return this.validateOAuthLogin(googleUserData);
  }
}
