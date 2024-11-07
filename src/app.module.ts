import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
// import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { RolesModule } from './roles/roles.module';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { PrismaService } from './prisma/prisma.service';
import { EventCategoriesModule } from './event-categories/event-categories.module';
import { VanuesModule } from './vanues/vanues.module';
import { ScheduleModule } from './schedule/schedule.module';
import { EventTicketModule } from './event-ticket/event-ticket.module';
import { SessionCartModule } from './session-cart/session-cart.module';

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
    VanuesModule,
    ScheduleModule,
    EventTicketModule,
    SessionCartModule,
  ],
  controllers: [AppController, EventsController],
  providers: [AppService, EventsService, PrismaService],
  exports: [PrismaModule],
})
export class AppModule {}
