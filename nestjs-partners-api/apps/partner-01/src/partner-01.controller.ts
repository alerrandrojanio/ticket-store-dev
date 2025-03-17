import { Controller, Get } from '@nestjs/common';
import { Partner01Service } from './partner-01.service';

@Controller()
export class Partner01Controller {
  constructor(private readonly partner01Service: Partner01Service) {}

  @Get()
  getHello(): string {
    return this.partner01Service.getHello();
  }
}
