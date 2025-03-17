import { Test, TestingModule } from '@nestjs/testing';
import { Partner02Controller } from './partner-02.controller';
import { Partner02Service } from './partner-02.service';

describe('Partner02Controller', () => {
  let partner02Controller: Partner02Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Partner02Controller],
      providers: [Partner02Service],
    }).compile();

    partner02Controller = app.get<Partner02Controller>(Partner02Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(partner02Controller.getHello()).toBe('Hello World!');
    });
  });
});
