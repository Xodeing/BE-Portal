import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Constants } from '../constans/constans';
import { GoogleService } from '../google/google.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private googleService: GoogleService) {
    super({
      clientID: Constants.GOOGLE_CLIENT_ID,
      clientSecret: Constants.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback', // Pastikan URL ini sesuai dengan redirect URL Anda
      scope: ['email', 'profile'], // Menentukan scope yang akan diminta (email dan profile)
    });
  }

  async validate(
    access_token: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      // Ambil data pengguna dari profil Google
      const { id, name, emails } = profile;

      // Panggil GoogleService untuk validasi atau buat akun pengguna baru jika belum ada
      const user = await this.googleService.validateOAuthLogin({
        googleId: id,
        email: emails[0].value, // Ambil email pengguna dari profil
        firstName: name.givenName, // Ambil nama depan dari profil
        lastName: name.familyName, // Ambil nama belakang dari profil
      });

      // Mengembalikan data pengguna
      done(null, user);
    } catch (error) {
      console.error('Error dalam proses validasi Google OAuth:', error);
      done(error, null); // Jika terjadi error, kirimkan error ke callback
    }
  }
}
