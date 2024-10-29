import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  passwordResetRequest: any;
  constructor() {
    super();
  }
}
