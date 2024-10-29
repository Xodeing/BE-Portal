import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Schedule } from '@prisma/client';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateScheduleDto): Promise<Schedule> {
    const scheduleData: Prisma.ScheduleCreateInput = {
      activityStart: new Date(data.activityStart),
      activityEnd: new Date(data.activityEnd),
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      speaker: {
        connect: { id: data.speakerId },
      },
      event: {
        connect: { id: data.eventId },
      },
      // Hapus koneksi ke user jika relasi tidak ada di skema
    };

    return this.prisma.schedule.create({
      data: scheduleData,
    });
  }

  async findAll(): Promise<Schedule[]> {
    return this.prisma.schedule.findMany({
      include: {
        speaker: true,
        event: true,
      },
    });
  }

  async findOne(id: number): Promise<Schedule> {
    return this.prisma.schedule.findUnique({
      where: { id },
      include: {
        speaker: true,
        event: true,
      },
    });
  }

  async update(id: number, data: UpdateScheduleDto): Promise<Schedule> {
    const scheduleData: Prisma.ScheduleUpdateInput = {
      activityStart: data.activityStart
        ? new Date(data.activityStart)
        : undefined,
      activityEnd: data.activityEnd ? new Date(data.activityEnd) : undefined,
      updatedBy: data.updatedBy,
      speaker: data.speakerId ? { connect: { id: data.speakerId } } : undefined,
      event: data.eventId ? { connect: { id: data.eventId } } : undefined,
      // Hapus koneksi ke user jika relasi tidak ada di skema
    };

    return this.prisma.schedule.update({
      where: { id },
      data: scheduleData,
    });
  }

  async remove(id: number): Promise<Schedule> {
    return this.prisma.schedule.delete({
      where: { id },
    });
  }
}
