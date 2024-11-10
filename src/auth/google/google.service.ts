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

  async validateOAuthLogin(userData: any): Promise<any> {
    let user = await this.prisma.users.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      user = await this.prisma.users.create({
        data: {
          email: userData.email,
          googleId: userData.googleId,
          userProfileId: {}, // Ganti jika ada relasi spesifik
          userName: `${userData.firstName} ${userData.lastName}`,
          password: '', // Kosongkan karena menggunakan OAuth
          status: true,
          role: {
            connect: { id: 2 }, // Role visitor
          },
        },
      });
    }

    const payload = { sub: user.id, email: user.email, role: 'visitor' };
    return {
      accessToken: this.jwtService.sign(payload), // Menghasilkan JWT
    };
  }

  async handleGoogleOAuthCallback(code: string) {
    try {
      const { data } = await axios.post(
        'https://oauth2.googleapis.com/token',
        new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: `https://beportal1-c69uolb8.b4a.run/auth/google/callback`,
          grant_type: 'authorization_code',
        }),
      );

      const { access_token } = data;

      const userData = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      return this.validateOAuthLogin(userData.data);
    } catch (error) {
      console.error('Error Google OAuth:', error);
      throw new Error('Authentication failed');
    }
  }
}
