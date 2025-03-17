import { Module } from '@nestjs/common';
import { Partner02Controller } from './partner-02.controller';
import { Partner02Service } from './partner-02.service';

@Module({
  imports: [],
  controllers: [Partner02Controller],
  providers: [Partner02Service],
})
export class Partner02Module {}
