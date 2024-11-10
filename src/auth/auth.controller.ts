// src/auth/auth.controller.ts
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GoogleService } from './google/google.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private googleService: GoogleService,
    private authS: AuthService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res: Response) {
    const code = req.query.code as string;
    if (!code) {
      throw new BadRequestException('Code is required');
    }

    const jwt = await this.googleService.handleGoogleOAuthCallback(code);

    if (jwt && jwt.accessToken) {
      res.cookie('accessToken', jwt.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      res.redirect('http://localhost:3000');
    } else {
      throw new BadRequestException('Authentication failed');
    }
  }
  @ApiTags('Reset Password')
  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.authS.requestPasswordReset(email);
  }

  @ApiTags('Reset Password')
  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    if (!token || !newPassword) {
      throw new BadRequestException('Token and new password are required');
    }
    return this.authS.resetPassword(token, newPassword);
  }
}
