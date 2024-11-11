import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { RolesModule } from './roles/roles.module';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { PrismaService } from './prisma/prisma.service';
import { EventCategoriesModule } from './event-categories/event-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    EventsModule,
    SponsorsModule,
    RolesModule,
    EventCategoriesModule,
  ],
  controllers: [AppController, EventsController],
  providers: [AppService, EventsService, PrismaService],
  exports: [PrismaModule],
})
export class AppModule {}
