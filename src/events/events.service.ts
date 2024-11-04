import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetEventsDto } from './dto/get-events.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsEntity } from './entities/event.entity';
import { EventDetailsDto } from './dto/event-details.dto';
import { BannerPortalDto } from './dto/banner-portal.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async getEventDetails(eventId: number): Promise<EventDetailsDto> {
    const event = await this.prisma.events.findUnique({
      where: { id: eventId },
      include: {
        eventCategory: true,
        Schedule: { include: { speaker: true } },
        EventTicket: true,
        Venue: true,
        Sponsors: true,
        Banner: {
          include: {
            Galery: { include: { galeryCategory: true } },
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    return {
      id: event.id,
      eventName: event.eventName,
      eventDateStart: event.eventDateStart,
      eventDateEnd: event.eventDateEnd,
      eventStatus: event.eventStatus,
      eventSeatMax: event.eventSeatMax,
      eventSeatCount: event.eventSeatCount,
      eventLogo: event.eventLogo,
      description: event.description,
      eventCategory: event.eventCategory
        ? {
            id: event.eventCategory.id,
            categoryName: event.eventCategory.categoryName,
          }
        : undefined,
      schedule: event.Schedule.map((schedule) => ({
        id: schedule.id,
        activityStart: schedule.activityStart,
        activityEnd: schedule.activityEnd,
        speakerId: schedule.speakerId,
        speaker: schedule.speaker
          ? {
              id: schedule.speaker.id,
              name: schedule.speaker.name,
              profession: schedule.speaker.profession,
              instagram: schedule.speaker.instagram,
              facebook: schedule.speaker.facebook,
              linkedin: schedule.speaker.linkedin,
              photo: schedule.speaker.photo,
            }
          : undefined,
      })),
      eventTicket: event.EventTicket.map((ticket) => ({
        id: ticket.id,
        ticketPrice: Number(ticket.ticketPrice),
        description: ticket.description,
        seatCount: ticket.seatCount,
        seatMax: ticket.seatMax,
        saleStart: ticket.saleStart,
        saleEnd: ticket.saleEnd,
        status: ticket.status,
      })),
      venue: event.Venue.map((venue) => ({
        id: venue.id,
        venueName: venue.venueName,
        venueDesc: venue.venueDesc,
        venueAddress: venue.venueAddress,
        venueCity: venue.venueCity,
        venueGMapsLocation: venue.venueGMapsLocation,
        latitude: venue.latitude,
        longitude: venue.longitude,
      })),
      sponsors: event.Sponsors.map((sponsor) => ({
        id: sponsor.id,
        sponsorName: sponsor.sponsorName,
        sponsorWebLink: sponsor.sponsorWebLink,
        sponsorLogo: sponsor.sponsorLogo,
      })),
      banner: event.Banner.map((banner) => ({
        id: banner.id,
        titleBanner: banner.titleBanner,
        seatMax: banner.seatMax,
        speakerCount: banner.speakerCount,
        city: banner.city,
        eventTime: banner.eventTime,
        galery: banner.Galery.map((galery) => ({
          id: galery.id,
          namePicture: galery.namePicture,
          category: galery.galeryCategory
            ? {
                id: galery.galeryCategory.id,
                categoryGalery: galery.galeryCategory.categoryGalery,
              }
            : undefined,
        })),
      })),
    } as EventDetailsDto;
  }

  async createEvent(createEventDto: CreateEventDto): Promise<EventsEntity> {
    try {
      const newEvent = await this.prisma.events.create({
        data: {
          ...createEventDto,
          eventCategoryId: createEventDto.eventCategoryId ?? null,
        },
      });

      return {
        ...newEvent,
        eventDate: newEvent.eventDateStart,
      };
    } catch (error) {
      console.error('Error in createEvent:', error);
      throw new Error('Failed to create event');
    }
  }

  async updateEvent(
    id: number,
    updateEventDto: UpdateEventDto,
  ): Promise<EventsEntity> {
    try {
      const updatedEvent = await this.prisma.events.update({
        where: { id },
        data: {
          ...updateEventDto,
          eventCategoryId: updateEventDto.eventCategoryId ?? null,
        },
      });

      return {
        ...updatedEvent,
        eventDate: updatedEvent.eventDateStart,
      };
    } catch (error) {
      console.error('Error in updateEvent:', error);
      throw new Error(`Failed to update event with ID ${id}`);
    }
  }

  async deleteEvent(id: number): Promise<void> {
    try {
      await this.prisma.events.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error in deleteEvent:', error);
      throw new Error(`Failed to delete event with ID ${id}`);
    }
  }

  async getUpcomingEvents(query: GetEventsDto): Promise<EventsEntity[]> {
    const { page = 1, perPage = 6, startDate, endDate, eventCategory } = query;

    const whereClause: any = {};

    // Tambahkan filter kategori event jika ada
    if (eventCategory) {
      whereClause.eventCategoryId = eventCategory;
    }

    // Tambahkan filter tanggal mulai jika diberikan
    if (startDate) {
      let start = new Date(startDate);
      if (!startDate.includes('T')) {
        start = new Date(`${startDate}T00:00:00.000Z`);
      }
      if (isNaN(start.getTime())) {
        throw new BadRequestException('Invalid startDate');
      }
      whereClause.eventDateStart = { gte: start };
    }

    // Tambahkan filter tanggal akhir jika diberikan
    if (endDate) {
      let end = new Date(endDate);
      if (!endDate.includes('T')) {
        end = new Date(`${endDate}T23:59:59.999Z`);
      }
      if (isNaN(end.getTime())) {
        throw new BadRequestException('Invalid endDate');
      }
      whereClause.eventDateEnd = { lte: end };
    }

    // Tambahkan filter agar hanya menampilkan event yang belum terlewat
    const today = new Date();
    whereClause.eventDateStart = {
      ...whereClause.eventDateStart,
      gte: today,
    };

    try {
      const events = await this.prisma.events.findMany({
        where: whereClause,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: { eventDateStart: 'asc' },
      });

      return events.map((event) => ({
        ...event,
        eventDate: event.eventDateStart,
      })) as EventsEntity[];
    } catch (error) {
      console.error('Error in getUpcomingEvents:', error);
      throw new Error('Failed to fetch upcoming events');
    }
  }
  async getEventById(id: number): Promise<EventsEntity> {
    try {
      const event = await this.prisma.events.findUnique({
        where: { id },
      });
      if (!event) {
        throw new NotFoundException(`Event with ID ${id} not found`);
      }

      return {
        ...event,
        eventDate: event.eventDateStart,
      };
    } catch (error) {
      console.error('Error in getEventById:', error);
      throw new Error(`Failed to fetch event with ID ${id}`);
    }
  }

  async getBannerPortal(
    startDate?: string,
    endDate?: string,
  ): Promise<BannerPortalDto[]> {
    const whereClause: any = {};

    if (startDate) {
      const start = new Date(startDate);
      if (isNaN(start.getTime())) {
        throw new BadRequestException('Invalid startDate format');
      }
      whereClause.eventTime = { gte: start };
    }

    if (endDate) {
      const end = new Date(endDate);
      if (isNaN(end.getTime())) {
        throw new BadRequestException('Invalid endDate format');
      }
      whereClause.eventTime = { lte: end };
    }

    const banners = await this.prisma.banner.findMany({
      where: whereClause,
      include: {
        Galery: {
          include: {
            galeryCategory: true,
          },
        },
      },
    });

    return banners.map((banner) => ({
      id: banner.id,
      titleBanner: banner.titleBanner,
      seatMax: banner.seatMax,
      speakerCount: banner.speakerCount,
      city: banner.city,
      eventTime: banner.eventTime,
      galery: banner.Galery.map((galery) => ({
        id: galery.id,
        namePicture: galery.namePicture,
        galeryCategory: galery.galeryCategory
          ? {
              id: galery.galeryCategory.id,
              categoryGalery: galery.galeryCategory.categoryGalery,
            }
          : undefined,
      })),
    })) as BannerPortalDto[];
  }
}
