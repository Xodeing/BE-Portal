// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsOptional, IsString, IsInt } from 'class-validator';

export class GaleryCategoryDto {
  @IsInt()
  id: number;

  @IsString()
  categoryGalery: string;
}

export class GaleryDto {
  @IsInt()
  id: number;

  @IsString()
  namePicture: string;

  galeryCategory?: GaleryCategoryDto;
}

export class BannerPortalDto {
  @IsInt()
  id: number;

  @IsString()
  titleBanner: string;

  @IsInt()
  seatMax: number;

  @IsInt()
  speakerCount: number;

  @IsString()
  city: string;

  eventTime: Date;

  galery: GaleryDto[];
}
