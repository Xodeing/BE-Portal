import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { GetEventsDto } from './dto/get-events.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventDetailsDto } from './dto/event-details.dto';
import { EventsEntity } from './entities/event.entity';
import { ApiQuery, ApiParam, ApiTags } from '@nestjs/swagger';
import { BannerPortalDto } from './dto/banner-portal.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @Get('banner/portal')
  async getBannerPortal(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<BannerPortalDto[]> {
    return this.eventsService.getBannerPortal(startDate, endDate);
  }

  @Post()
  async createEvent(
    @Body() createEventDto: CreateEventDto,
  ): Promise<EventsEntity> {
    return this.eventsService.createEvent(createEventDto);
  }

  @ApiParam({ name: 'id', required: true, type: Number })
  @Patch(':id')
  async updateEvent(
    @Param('id') id: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<EventsEntity> {
    return this.eventsService.updateEvent(id, updateEventDto);
  }

  @ApiParam({ name: 'id', required: true, type: Number })
  @Delete(':id')
  async deleteEvent(@Param('id') id: number): Promise<{ message: string }> {
    await this.eventsService.deleteEvent(id);
    return { message: 'Event deleted successfully' };
  }

  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'perPage', required: false, type: Number })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'eventCategory', required: false, type: Number })
  @Get('upcoming')
  async getUpcomingEvents(
    @Query() query: GetEventsDto,
  ): Promise<EventsEntity[]> {
    return this.eventsService.getUpcomingEvents(query);
  }

  @ApiParam({ name: 'id', required: true, type: Number })
  @Get(':id')
  async getEventById(@Param('id') id: number): Promise<EventsEntity> {
    return this.eventsService.getEventById(id);
  }

  @Get('details/:id')
  async getEventDetails(@Param('id') id: string): Promise<EventDetailsDto> {
    const eventId = parseInt(id, 10);
    return this.eventsService.getEventDetails(eventId);
  }
}
