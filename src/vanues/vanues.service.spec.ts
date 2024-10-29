import { Test, TestingModule } from '@nestjs/testing';
import { VenuesService } from './vanues.service';

describe('VanuesService', () => {
  let service: VenuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VenuesService],
    }).compile();

    service = module.get<VenuesService>(VenuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
