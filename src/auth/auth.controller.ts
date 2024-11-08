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

  @ApiTags('Auth')
  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(@Req() req) {}

  @ApiTags('Auth')
  @Get('google/callback')
  @UseGuards(AuthGuard('google')) // Pastikan Google Guard digunakan
  async callback(@Req() req, @Res() res: Response) {
    try {
      const jwt = await this.googleService.loginWithGoogle(req.user);
      res.cookie('accessToken', jwt.accessToken, {
        httpOnly: true,
        secure: false, // Pastikan secure diatur ke true di production
      });
      res.redirect('http://localhost:3000/success'); // Redirect setelah login sukses
    } catch (error) {
      console.error('Error saat login dengan Google:', error);
      res.redirect('http://localhost:3000/error'); // Redirect ke halaman error jika gagal
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
