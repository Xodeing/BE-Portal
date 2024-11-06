import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  BadRequestException,
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
  authS: any;
  constructor(private readonly authService: AuthService) {}

  @ApiTags('auth')
  @Post('login')
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @ApiBearerAuth()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Otomatis diarahkan ke Google Login
  }

  // Google akan memanggil URL ini setelah login
  @ApiBearerAuth()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res: Response) {
    const jwt = await this.authService.loginWithGoogle(req.user);
    res.cookie('accessToken', jwt.accessToken, {
      httpOnly: true,
      secure: false, // Ubah menjadi true jika Anda menggunakan HTTPS
    });
    res.redirect('http://localhost:3000/auth/google/callback');
  }

  @ApiBearerAuth()
  @ApiTags('Reset Password')
  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.authS.requestPasswordReset(email);
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
    return this.authS.resetPassword(token, newPassword);
  }
}
