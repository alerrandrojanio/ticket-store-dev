import { Controller, Get } from '@nestjs/common';
import { Partner02Service } from './partner-02.service';

@Controller()
export class Partner02Controller {
  constructor(private readonly partner02Service: Partner02Service) {}

  @Get()
  getHello(): string {
    return this.partner02Service.getHello();
  }
}
