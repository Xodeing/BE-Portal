import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2'; // Import argon2
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Metode untuk membuat pengguna baru
  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.password) {
      throw new Error('Password is required');
    }

    // Menggunakan argon2 untuk hash password tanpa saltLength
    const hashedPassword = await argon2.hash(createUserDto.password);

    const userData = {
      ...createUserDto,
      password: hashedPassword,
      status: false,
    };

    const roleId = 2; // Hardcode roleId ke 2
    const roleExists = await this.prisma.roles.findUnique({
      where: { id: roleId },
    });

    if (!roleExists) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    const prismaUserData = { ...userData, role: { connect: { id: roleId } } };

    try {
      return await this.prisma.users.create({ data: prismaUserData });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const targetField =
            (error.meta?.target as string[])?.join(', ') || 'field';
          throw new ConflictException(`Duplikasi data pada ${targetField}`);
        }
      }
      throw error;
    }
  }

  // Metode untuk mengambil semua pengguna
  async findAll() {
    return this.prisma.users.findMany();
  }

  // Metode untuk menemukan pengguna berdasarkan ID
  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      include: { role: true }, // Mengambil informasi role jika diperlukan
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Metode untuk memperbarui pengguna berdasarkan ID
  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      // Menggunakan argon2 untuk hash password baru tanpa saltLength
      updateUserDto.password = await argon2.hash(updateUserDto.password);
    }

    const updateData: any = { ...updateUserDto };

    if (updateUserDto.roleId) {
      const roleExists = await this.prisma.roles.findUnique({
        where: { id: updateUserDto.roleId },
      });
      if (!roleExists) {
        throw new NotFoundException(
          `Role with ID ${updateUserDto.roleId} not found`,
        );
      }
      updateData.role = { connect: { id: updateUserDto.roleId } };
      delete updateData.roleId;
    }

    try {
      return await this.prisma.users.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const targetField =
            (error.meta?.target as string[])?.join(', ') || 'field';
          throw new ConflictException(`Duplikasi data pada ${targetField}`);
        }
      }
      throw error;
    }
  }

  // Metode untuk menghapus pengguna berdasarkan ID
  async remove(id: number) {
    const deletedUser = await this.prisma.users.delete({ where: { id } });
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return deletedUser;
  }

  // Metode untuk mengambil riwayat event user beserta status kehadiran
  async getUserEventHistory(userId: number) {
    return this.prisma.events.findMany({
      where: {
        ParticipantLists: {
          some: {
            participantId: userId,
          },
        },
      },
      include: {
        ParticipantLists: {
          where: { participantId: userId },
          select: {
            attendanceTime: true,
            attendance: true, // Ambil status kehadiran
          },
        },
      },
    });
  }
}
