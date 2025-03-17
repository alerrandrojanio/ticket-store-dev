import { Injectable } from '@nestjs/common';

@Injectable()
export class Partner01Service {
  getHello(): string {
    return 'Hello World!';
  }
}
