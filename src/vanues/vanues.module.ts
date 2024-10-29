import { Module } from '@nestjs/common';
import { VenuesService } from './vanues.service';
import { VenuesController } from './vanues.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [VenuesService, PrismaService],
  controllers: [VenuesController],
})
export class VanuesModule {}
