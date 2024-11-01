import { Test, TestingModule } from '@nestjs/testing';
import { EventTicketService } from './event-ticket.service';

describe('EventTicketService', () => {
  let service: EventTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventTicketService],
    }).compile();

    service = module.get<EventTicketService>(EventTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
