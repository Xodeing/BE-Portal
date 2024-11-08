import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express'; // Pastikan Anda mengimpor Response

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint untuk login menggunakan email dan password
  @Post('login')
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  // Endpoint untuk login dengan Google (menggunakan AuthGuard)
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Otomatis diarahkan ke halaman login Google
  }

  // Endpoint callback setelah login Google
  @Post('google/callback')
  async googleCallback(@Body() body: { code: string }, @Res() res: Response) {
    const { code } = body;

    if (!code) {
      throw new BadRequestException('Kode otorisasi tidak ditemukan');
    }

    try {
      // Tukar kode otorisasi dengan token dan ambil data pengguna
      const { access_token, user } =
        await this.authService.getGoogleUserData(code);

      // Simpan token di cookie
      res.cookie('token', access_token, {
        httpOnly: true,
        secure: false, // Set true jika menggunakan HTTPS di production
      });

      // Kirimkan data pengguna dan token ke frontend
      res.json({ success: true, user });
    } catch (error) {
      console.error('Error saat autentikasi:', error);
      throw new BadRequestException('Autentikasi gagal');
    }
  }

  // Endpoint callback dari Google menggunakan AuthGuard untuk token valid
  @Get('google/callback/redirect')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res: Response) {
    // Mendapatkan JWT setelah login menggunakan Google
    const jwt = await this.authService.loginWithGoogle(req.user);

    // Set token di cookie
    res.cookie('accessToken', jwt.accessToken, {
      httpOnly: true,
      secure: false, // Ubah menjadi true jika menggunakan HTTPS
    });

    // Redirect ke halaman utama
    res.redirect('http://localhost:3000');
  }

  // Endpoint untuk reset password
  @ApiBearerAuth()
  @ApiTags('Reset Password')
  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.authService.requestPasswordReset(email);
  }

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
