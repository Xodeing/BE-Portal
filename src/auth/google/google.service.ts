import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

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
          userProfileId: {},
          userName: userData.firstName + ' ' + userData.lastName,
          password: '',
          status: true,
          role: {
            connect: { id: 2 },
          },
        },
      });
    }

    const payload = { userId: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  async loginWithGoogle(user: any) {
    const payload = { username: user.email, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
