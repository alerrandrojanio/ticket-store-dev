import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { SpotsModule } from './spots/spots.module';
import { PrismaModule } from '../../../libs/core/src/prisma/prisma.module'
import { AuthModule } from '@app/core/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.partner02', isGlobal: true }),
    PrismaModule,
    AuthModule,
    EventsModule,
    SpotsModule,
  ],
})
export class Partner02Module {}
