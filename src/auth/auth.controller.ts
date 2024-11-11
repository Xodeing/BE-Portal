import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  BadRequestException,
  Get,
  Req,
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

  @ApiTags('Auth')
  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(@Req() req) {}

  @ApiTags('Auth')
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res: Response) {
    const jwt = await this.googleService.loginWithGoogle(req.user);
    res.cookie('accessToken', jwt.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Pastikan menggunakan HTTPS di production
      sameSite: 'strict', // Pastikan cookie hanya dikirimkan pada permintaan dari domain yang sama
    });
    res.redirect('http://localhost:3000'); // Ganti dengan URL yang sesuai
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
