import { Module } from '@nestjs/common';
import { SessionCartService } from './session-cart.service';
import { SessionCartController } from './session-cart.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SessionCartService],
  controllers: [SessionCartController],
})
export class SessionCartModule {}
