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
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  googleService: any;
  constructor(private readonly authService: AuthService) {}

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
      secure: false,
    });
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
