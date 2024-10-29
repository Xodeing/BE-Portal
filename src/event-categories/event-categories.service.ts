import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';

@Injectable()
export class EventCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEventCategoryDto) {
    return this.prisma.eventCategories.create({ data });
  }

  async findAll() {
    return this.prisma.eventCategories.findMany();
  }

  async findOne(id: number) {
    return this.prisma.eventCategories.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateEventCategoryDto) {
    return this.prisma.eventCategories.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.eventCategories.delete({
      where: { id },
    });
  }
}
