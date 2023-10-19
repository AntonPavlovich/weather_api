import { IsOptional, IsString } from 'class-validator';

export class GetWeatherDataDto {
  @IsString()
  lat: string;

  @IsString()
  lon: number;

  @IsOptional()
  part: string[];
}
