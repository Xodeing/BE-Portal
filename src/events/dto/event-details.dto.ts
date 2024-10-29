import { IsInt, IsString, IsDate, IsOptional, IsArray } from 'class-validator';

export class EventDetailsDto {
  @IsInt()
  id: number;

  @IsString()
  eventName: string;

  @IsDate()
  eventDateStart: Date;

  @IsDate()
  eventDateEnd: Date;

  @IsString()
  eventStatus: boolean;

  @IsInt()
  eventSeatMax: number;

  @IsInt()
  eventSeatCount: number;

  @IsString()
  eventLogo: string;

  @IsString()
  description: string;

  @IsOptional()
  eventCategory?: {
    id: number;
    categoryName: string;
  };

  @IsArray()
  schedule?: {
    id: number;
    activityStart: Date;
    activityEnd: Date;
    speakerId: number;
  }[];

  @IsArray()
  participantLists?: {
    id: number;
    participantId: number;
    attendance: boolean;
    attendanceTime: Date;
  }[];

  @IsArray()
  eventTicket?: {
    id: number;
    ticketPrice: number;
    description: string;
    seatCount: number;
    seatMax: number;
    saleStart: Date;
    saleEnd: Date;
    status: boolean;
  }[];

  @IsArray()
  venue?: {
    id: number;
    venueName: string;
    venueDesc: string; // Menambahkan deskripsi venue
    venueAddress: string;
    venueCity: string;
    venueGMapsLocation: string; // Menambahkan lokasi Google Maps
    latitude: string; // Menambahkan latitude
    longitude: string; // Menambahkan longitude
  }[];

  @IsArray()
  sponsors?: {
    id: number;
    sponsorName: string;
    sponsorWebLink: string;
    sponsorLogo: string;
  }[];
}
