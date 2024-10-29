import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@ApiTags('default') //default
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('Profile')
  @ApiBearerAuth()
  getHello(): string {
    return this.appService.getHello();
  }
}
