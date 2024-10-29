import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventTicketDto } from './dto/create-event-ticket.dto';
import { UpdateEventTicketDto } from './dto/update-event-ticket.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventTicketService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new event ticket
  async create(createEventTicketDto: CreateEventTicketDto) {
    const eventExists = await this.prisma.events.findUnique({
      where: { id: createEventTicketDto.eventId },
    });

    if (!eventExists) {
      throw new NotFoundException(
        `Event with ID ${createEventTicketDto.eventId} not found`,
      );
    }

    return await this.prisma.eventTicket.create({
      data: createEventTicketDto as Prisma.EventTicketUncheckedCreateInput, // Casting di sini
    });
  }

  // Retrieve all event tickets
  async findAll() {
    return await this.prisma.eventTicket.findMany();
  }

  // Retrieve a single event ticket by ID
  async findOne(id: number) {
    const eventTicket = await this.prisma.eventTicket.findUnique({
      where: { id },
    });
    if (!eventTicket) {
      throw new NotFoundException(`Event Ticket with ID ${id} not found`);
    }
    return eventTicket;
  }

  // Update an event ticket by ID
  async update(id: number, updateEventTicketDto: UpdateEventTicketDto) {
    const eventTicket = await this.prisma.eventTicket.update({
      where: { id },
      data: updateEventTicketDto,
    });
    if (!eventTicket) {
      throw new NotFoundException(`Event Ticket with ID ${id} not found`);
    }
    return eventTicket;
  }

  // Remove an event ticket by ID
  async remove(id: number) {
    const deletedEventTicket = await this.prisma.eventTicket.delete({
      where: { id },
    });
    if (!deletedEventTicket) {
      throw new NotFoundException(`Event Ticket with ID ${id} not found`);
    }
    return deletedEventTicket;
  }
}
