import { Test, TestingModule } from '@nestjs/testing';
import { StormDbService } from './lowdb.service';

describe('LowDb service', () => {
  let service = StormDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [service],
    }).compile();
    service = module.get(StormDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
