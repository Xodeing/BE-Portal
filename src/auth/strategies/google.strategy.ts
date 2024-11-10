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
      callbackURL: 'https://beportal1-c69uolb8.b4a.run/auth/google/callback',
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
    const user = await this.googleS.validateOAuthLogin({
      googleId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    });
    done(null, user);
  }
}
