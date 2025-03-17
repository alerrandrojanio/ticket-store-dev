import { Test, TestingModule } from '@nestjs/testing';
import { Partner01Controller } from './partner-01.controller';
import { Partner01Service } from './partner-01.service';

describe('Partner01Controller', () => {
  let partner01Controller: Partner01Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Partner01Controller],
      providers: [Partner01Service],
    }).compile();

    partner01Controller = app.get<Partner01Controller>(Partner01Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(partner01Controller.getHello()).toBe('Hello World!');
    });
  });
});
