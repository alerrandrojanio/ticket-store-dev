import { Module } from '@nestjs/common';
import { Partner01Controller } from './partner-01.controller';
import { Partner01Service } from './partner-01.service';

@Module({
  imports: [],
  controllers: [Partner01Controller],
  providers: [Partner01Service],
})
export class Partner01Module {}
