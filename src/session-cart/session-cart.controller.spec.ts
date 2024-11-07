import { Test, TestingModule } from '@nestjs/testing';
import { SessionCartController } from './session-cart.controller';

describe('SessionCartController', () => {
  let controller: SessionCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionCartController],
    }).compile();

    controller = module.get<SessionCartController>(SessionCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
