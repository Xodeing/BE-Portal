import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';

@Injectable()
export class SponsorsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new sponsor
  async create(createSponsorDto: CreateSponsorDto) {
    try {
      // Sesuaikan data agar mencakup properti event
      return await this.prisma.sponsors.create({
        data: {
          sponsorName: createSponsorDto.sponsorName,
          sponsorWebLink: createSponsorDto.sponsorWebLink,
          sponsorLogo: createSponsorDto.sponsorLogo,
          createdBy: createSponsorDto.createdBy,
          updatedBy: createSponsorDto.updatedBy,
          // Hubungkan dengan event menggunakan eventId dari DTO
          event: {
            connect: {
              id: createSponsorDto.eventId,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Failed to create sponsor: ${error.message}`);
    }
  }

  // Retrieve all sponsors
  async findAll() {
    try {
      return await this.prisma.sponsors.findMany();
    } catch (error) {
      throw new Error(`Failed to fetch sponsors: ${error.message}`);
    }
  }

  // Retrieve a single sponsor by id
  async findOne(id: number) {
    try {
      const sponsor = await this.prisma.sponsors.findUnique({ where: { id } });
      if (!sponsor) {
        throw new NotFoundException(`Sponsor with ID ${id} not found`);
      }
      return sponsor;
    } catch (error) {
      throw new Error(
        `Failed to fetch sponsor with ID ${id}: ${error.message}`,
      );
    }
  }

  // Update a sponsor by id
  async update(id: number, updateSponsorDto: UpdateSponsorDto) {
    try {
      const sponsor = await this.prisma.sponsors.update({
        where: { id },
        data: updateSponsorDto,
      });
      return sponsor;
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma's error code for "Record not found"
        throw new NotFoundException(`Sponsor with ID ${id} not found`);
      }
      throw new Error(
        `Failed to update sponsor with ID ${id}: ${error.message}`,
      );
    }
  }

  // Remove a sponsor by id
  async remove(id: number) {
    try {
      return await this.prisma.sponsors.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma's error code for "Record not found"
        throw new NotFoundException(`Sponsor with ID ${id} not found`);
      }
      throw new Error(
        `Failed to delete sponsor with ID ${id}: ${error.message}`,
      );
    }
  }
}
