import { Test, TestingModule } from '@nestjs/testing';
import { SessionCartService } from './session-cart.service';

describe('SessionCartService', () => {
  let service: SessionCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionCartService],
    }).compile();

    service = module.get<SessionCartService>(SessionCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
