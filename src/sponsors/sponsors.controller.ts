import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SponsorsService } from './sponsors.service';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('sponsors')
@Controller('sponsors')
export class SponsorsController {
  constructor(private readonly sponsorsService: SponsorsService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateSponsorDto })
  async create(@Body() createSponsorDto: CreateSponsorDto) {
    return await this.sponsorsService.create(createSponsorDto);
  }

  @Get()
  @ApiOkResponse({ type: CreateSponsorDto, isArray: true })
  async findAll() {
    return await this.sponsorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CreateSponsorDto })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.sponsorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CreateSponsorDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSponsorDto: UpdateSponsorDto,
  ) {
    return await this.sponsorsService.update(id, updateSponsorDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CreateSponsorDto })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.sponsorsService.remove(id);
  }
}
