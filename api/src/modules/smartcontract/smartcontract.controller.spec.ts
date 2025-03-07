import { Test, TestingModule } from '@nestjs/testing';

import { SmartcontractsController } from './smartcontract.controller';

describe('SmartcontractsController', () => {
  let controller: SmartcontractsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartcontractsController],
    }).compile();

    controller = module.get<SmartcontractsController>(SmartcontractsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
