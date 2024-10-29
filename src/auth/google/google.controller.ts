import { Controller } from '@nestjs/common';
import { GoogleService } from './google.service';

@Controller('auth')
export class GoogleController {
  constructor(private googleService: GoogleService) {}
}
