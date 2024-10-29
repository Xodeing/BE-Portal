import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';

@Injectable()
export class VenuesService {
  constructor(private prisma: PrismaService) {}

  async create(createVenueDto: CreateVenueDto) {
    return this.prisma.venue.create({
      data: {
        venueName: createVenueDto.venueName,
        venueDesc: createVenueDto.venueDesc,
        venueAddress: createVenueDto.venueAddress,
        venueCity: createVenueDto.venueCity,
        venueGMapsLocation: createVenueDto.venueGMapsLocation,
        latitude: createVenueDto.latitude,
        longitude: createVenueDto.longitude,
        createdBy: createVenueDto.createdBy,
        updatedBy: createVenueDto.updatedBy,
        // Hubungkan dengan `Event` menggunakan `eventId` dari DTO
        event: {
          connect: {
            id: createVenueDto.eventId,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.venue.findMany();
  }

  async findOne(id: number) {
    const venue = await this.prisma.venue.findUnique({ where: { id } });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${id} not found`);
    }
    return venue;
  }

  async update(id: number, updateVenueDto: UpdateVenueDto) {
    return this.prisma.venue.update({
      where: { id },
      data: {
        venueName: updateVenueDto.venueName,
        venueDesc: updateVenueDto.venueDesc,
        venueAddress: updateVenueDto.venueAddress,
        venueCity: updateVenueDto.venueCity,
        venueGMapsLocation: updateVenueDto.venueGMapsLocation,
        latitude: updateVenueDto.latitude,
        longitude: updateVenueDto.longitude,
        createdBy: updateVenueDto.createdBy,
        updatedBy: updateVenueDto.updatedBy,
        // Hubungkan event hanya jika eventId disediakan dalam update
        ...(updateVenueDto.eventId && {
          event: {
            connect: { id: updateVenueDto.eventId },
          },
        }),
      },
    });
  }

  async remove(id: number) {
    const deletedVenue = await this.prisma.venue.delete({ where: { id } });
    if (!deletedVenue) {
      throw new NotFoundException(`Venue with ID ${id} not found`);
    }
    return deletedVenue;
  }
}
