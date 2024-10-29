import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      return await this.prisma.roles.create({
        data: createRoleDto,
      });
    } catch (error) {
      throw new Error('Failed to create role: ' + error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.roles.findMany();
    } catch (error) {
      throw new Error('Failed to fetch roles: ' + error.message);
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.prisma.roles.findUnique({
        where: { id },
      });

      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }

      return role;
    } catch (error) {
      throw new Error(`Failed to fetch role with ID ${id}: ${error.message}`);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.prisma.roles.findUnique({
        where: { id },
      });

      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }

      return await this.prisma.roles.update({
        where: { id },
        data: updateRoleDto,
      });
    } catch (error) {
      throw new Error(`Failed to update role with ID ${id}: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const role = await this.prisma.roles.findUnique({
        where: { id },
      });

      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }

      return await this.prisma.roles.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to delete role with ID ${id}: ${error.message}`);
    }
  }
}
