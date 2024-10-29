import { ApiProperty } from '@nestjs/swagger';

export class VenueEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdBy: string | null;

  @ApiProperty()
  updatedBy: string | null;

  @ApiProperty()
  venueName: string;

  @ApiProperty()
  venueDesc: string;

  @ApiProperty()
  venueAddress: string;

  @ApiProperty()
  venueCity: string;

  @ApiProperty()
  venueGMapsLocation: string;

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;
}
