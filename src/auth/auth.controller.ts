import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  Req,
  Query, // Menambahkan decorator Query untuk menangani query parameter
  UseGuards,
  HttpCode,
  HttpStatus, // Menambahkan decorator HttpCode dan HttpStatus untuk respon kode 201
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('auth')
  @Post('login')
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  // Mengarahkan user ke halaman login Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Otomatis diarahkan ke Google Login
  }

  // Google akan memanggil URL ini setelah login
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    // User telah berhasil login, disini Anda bisa mengakses informasi user
    return {
      message: 'User info from Google',
      user: req.user,
    };
  }

  // @Post()
  // @ApiBearerAuth()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // @ApiBearerAuth()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // @ApiBearerAuth()
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // @ApiBearerAuth()
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // @ApiBearerAuth()
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }

  // Endpoint untuk permintaan reset password tanpa parameter
  @Post('request-password-reset')
  @HttpCode(HttpStatus.CREATED) // Set respons HTTP status code 201
  async requestPasswordReset() {
    await this.authService.requestPasswordReset();
  }

  // Endpoint untuk reset password
  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Query('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword({ token, newPassword });
  }
}
