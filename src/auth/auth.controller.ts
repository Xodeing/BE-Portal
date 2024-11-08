import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  BadRequestException,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GoogleService } from './google/google.service';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
  ) {}

  // Endpoint untuk login menggunakan email dan password
  @Post('login')
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  // Endpoint untuk autentikasi dengan Google (Langkah awal)
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Google OAuth akan memulai proses di sini.
  }

  // Endpoint callback setelah autentikasi Google berhasil
  @Get('google/callback') // Menambahkan metode GET di sini
  async googleCallback(@Query('code') code: string, @Res() res: Response) {
    if (!code) {
      throw new BadRequestException('Kode otorisasi tidak ditemukan');
    }

    try {
      const jwt = await this.googleService.loginWithGoogle(code);
      res.cookie('accessToken', jwt.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Hanya true di production
      });
      res.redirect('http://localhost:3000/success'); // Redirect ke halaman frontend setelah sukses
    } catch (error) {
      console.error('Error saat autentikasi:', error);
      res.redirect('http://localhost:3000/error'); // Redirect ke halaman error jika gagal
    }
  }

  // Endpoint untuk permintaan reset password
  @ApiBearerAuth()
  @ApiTags('Reset Password')
  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.authService.requestPasswordReset(email);
  }

  // Endpoint untuk reset password
  @ApiBearerAuth()
  @ApiTags('Reset Password')
  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    if (!token || !newPassword) {
      throw new BadRequestException('Token and new password are required');
    }
    return this.authService.resetPassword(token, newPassword);
  }
}
