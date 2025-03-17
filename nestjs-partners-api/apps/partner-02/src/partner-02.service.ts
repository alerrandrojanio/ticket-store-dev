import { Injectable } from '@nestjs/common';

@Injectable()
export class Partner02Service {
  getHello(): string {
    return 'Hello World!';
  }
}
