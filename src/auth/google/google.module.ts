import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Constants } from '../constans/constans';
import { PassportModule } from '@nestjs/passport';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { JwtStrategy } from '../jwt.strategy';
import { GoogleStrategy } from '../strategies/google.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: Constants.secret,
      signOptions: { expiresIn: Constants.expired },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  controllers: [GoogleController],
  providers: [GoogleService, JwtStrategy, GoogleStrategy],
  exports: [GoogleService],
})
export class GoogleModule {}
