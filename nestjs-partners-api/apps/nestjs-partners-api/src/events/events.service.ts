import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import type { ReserveSpotDto } from './dto/reserve-spot.dto';
import { Prisma, SpotStatus, TicketKind, TicketStatus } from '@prisma/client';
import e from 'express';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  create(createEventDto: CreateEventDto) {
    return this.prismaService.event.create({
      data: {
        ...createEventDto,
        date: new Date(createEventDto.date),
      },
    });
  }

  findAll() {
    return this.prismaService.event.findMany();
  }

  findOne(id: string) {
    return this.prismaService.event.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.prismaService.event.update({
      data: {
        ...updateEventDto,
        date: updateEventDto.date ? new Date(updateEventDto.date) : undefined,
      },
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.event.delete({
      where: {
        id,
      },
    });
  }

  async reserveSpot(reserveSpotDto: ReserveSpotDto & { eventId: string }) {
    const spots = await this.prismaService.spot.findMany({
      where: {
        eventId: reserveSpotDto.eventId,
        name: {
          in: reserveSpotDto.spots,
        },
      },
    });

    if (spots.length !== reserveSpotDto.spots.length) {
      const foundSpots = spots.map((spot) => spot.name);
      const notFoundSpots = reserveSpotDto.spots.filter(
        (spot) => !foundSpots.includes(spot),
      );

      throw new Error(`Spots ${notFoundSpots.join(', ')} not found`);
    }

    try {
      const tickets = await this.prismaService.$transaction(async (prisma) => {
        await prisma.reservationHistory.createMany({
          data: spots.map((spot) => ({
            spotId: spot.id,
            ticketKind: reserveSpotDto.ticketKind,
            email: reserveSpotDto.email,
            status: TicketStatus.RESERVED,
          })),
        });

        await prisma.spot.updateMany({
          where: {
            id: {
              in: spots.map((spot) => spot.id),
            },
          },
          data: {
            status: SpotStatus.RESERVED,
          },
        });

        const tickets = await Promise.all(
          spots.map((spot) =>
            prisma.ticket.create({
              data: {
                spotId: spot.id,
                ticketKind: reserveSpotDto.ticketKind,
                email: reserveSpotDto.email,
              },
            }),
          ),
        ); 

        return tickets;
      }, {isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted});

      return tickets;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002': // unique constraint violation
          case 'P2034': // transaction conflict
            throw new Error('Some spots are already reserved');
        }
      }

      throw e;
    }
  }
}
