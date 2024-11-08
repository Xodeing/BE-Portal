// src/auth/google/google.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class GoogleService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  // Menghapus method loginWithGoogle yang tidak perlu
  // Menambahkan validasi dan pembuatan token
  async validateOAuthLogin(userData: any): Promise<any> {
    let user = await this.prisma.users.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      user = await this.prisma.users.create({
        data: {
          email: userData.email,
          googleId: userData.googleId,
          userProfileId: {},
          userName: userData.firstName + ' ' + userData.lastName,
          password: '', // Karena menggunakan Google OAuth, password kosong
          status: true,
          role: {
            connect: { id: 2 }, // Pastikan role sudah sesuai
          },
        },
      });
    }

    const payload = { userId: user.id };
    return {
      accessToken: this.jwtService.sign(payload), // Menghasilkan token JWT
    };
  }

  // Menangani callback Google OAuth
  async handleGoogleOAuthCallback(code: string) {
    try {
      // 1. Tukar kode otorisasi menjadi akses token
      const { data } = await axios.post(
        'https://oauth2.googleapis.com/token',
        new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID, // Pastikan client_id dan client_secret sudah diatur
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: `https://beportal1-c69uolb8.b4a.run/auth/google/callback`,
          grant_type: 'authorization_code',
        }),
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { access_token, id_token } = data;

      // 2. Ambil data profil pengguna menggunakan access token
      const userData = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      // 3. Validasi dan buat token JWT untuk pengguna
      return this.validateOAuthLogin(userData.data);
    } catch (error) {
      console.error('Error saat login dengan Google: ', error);
      throw new Error('Autentikasi gagal');
    }
  }
}
