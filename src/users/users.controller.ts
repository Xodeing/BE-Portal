import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Request,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('SignUp')
@Controller('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint untuk mendapatkan profil user dan riwayat event beserta status kehadiran
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req) {
    const userId = req.user.id; // Pastikan userId adalah angka
    console.log(`Getting profile for user ID: ${userId}`); // Tambahkan log untuk memeriksa ID
    const numericUserId = Number(userId);

    if (isNaN(numericUserId)) {
      throw new NotFoundException(`User ID is invalid. ID must be a number.`);
    }

    const user = await this.usersService.findOne(numericUserId);
    const eventHistory =
      await this.usersService.getUserEventHistory(numericUserId);

    return {
      id: user.id,
      email: user.email,
      userName: user.userName,
      eventHistory: eventHistory.map((event) => ({
        id: event.id,
        eventName: event.eventName,
        eventDateStart: event.eventDateStart,
        eventDateEnd: event.eventDateEnd,
        eventStatus: event.eventStatus,
        description: event.description,
        attendance:
          event.ParticipantLists.length > 0
            ? {
                attendanceTime: event.ParticipantLists[0].attendanceTime,
                status: !!event.ParticipantLists[0].attendanceTime, // status true jika attendanceTime ada
              }
            : {
                attendanceTime: null,
                status: false,
              },
      })),
    };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // Tambahkan auth guard jika perlu
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // Tambahkan auth guard jika perlu
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const numericId = Number(id);
    console.log(`Finding user with ID: ${id}`); // Tambahkan log untuk memeriksa ID
    // Validasi format ID
    if (isNaN(numericId)) {
      throw new NotFoundException(`Invalid ID format. ID must be a number.`);
    }
    return this.usersService.findOne(numericId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // Tambahkan auth guard jika perlu
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const numericId = Number(id);
    console.log(`Updating user with ID: ${id}`); // Tambahkan log untuk memeriksa ID
    if (isNaN(numericId)) {
      throw new NotFoundException(`Invalid ID format. ID must be a number.`);
    }
    return this.usersService.update(numericId, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // Tambahkan auth guard jika perlu
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const numericId = Number(id);
    console.log(`Removing user with ID: ${id}`); // Tambahkan log untuk memeriksa ID
    if (isNaN(numericId)) {
      throw new NotFoundException(`Invalid ID format. ID must be a number.`);
    }
    return this.usersService.remove(numericId);
  }
}
