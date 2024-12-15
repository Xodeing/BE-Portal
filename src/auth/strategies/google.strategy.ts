import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Constants } from '../constans/constans';
import { GoogleService } from '../google/google.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private googleS: GoogleService) {
    super({
      clientID: Constants.GOOGLE_CLIENT_ID,
      clientSecret: Constants.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    access_token: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails } = profile;

    // Mengambil data user yang telah terverifikasi atau membuat akun baru
    const user = await this.googleS.validateOAuthLogin({
      googleId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    });

    // Return done dengan informasi user yang sudah diproses
    // Di sini kita bisa memutuskan untuk mengembalikan hanya user atau juga accessToken
    done(null, {
      user, // Ini mengembalikan objek user
      accessToken: user.accessToken, // Jika Anda ingin mengembalikan token juga, pastikan itu ada di 'user'
    });
  }
}
