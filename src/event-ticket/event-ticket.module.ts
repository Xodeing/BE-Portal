import { Module } from '@nestjs/common';
import { EventTicketService } from './event-ticket.service';
import { EventTicketController } from './event-ticket.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EventTicketController],
  providers: [EventTicketService, PrismaService],
})
export class EventTicketModule {}
