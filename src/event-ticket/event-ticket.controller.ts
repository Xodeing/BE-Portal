import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventTicketService } from './event-ticket.service';
import { CreateEventTicketDto } from './dto/create-event-ticket.dto';
import { UpdateEventTicketDto } from './dto/update-event-ticket.dto';

@ApiTags('Event Tickets')
@Controller('event-tickets')
export class EventTicketController {
  constructor(private readonly eventTicketService: EventTicketService) {}

  @Post()
  async create(@Body() createEventTicketDto: CreateEventTicketDto) {
    return this.eventTicketService.create(createEventTicketDto);
  }

  @Get()
  async findAll() {
    return this.eventTicketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.eventTicketService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEventTicketDto: UpdateEventTicketDto,
  ) {
    return this.eventTicketService.update(id, updateEventTicketDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.eventTicketService.remove(id);
  }
}
