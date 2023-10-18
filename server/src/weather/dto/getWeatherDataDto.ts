import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

enum Part {
  current = 'current',
  minutely = 'minutely',
  hourly = 'hourly',
  daily = 'daily',
  alerts = 'alerts'
}

export class SaveWeatherDataDto {
  
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  lon: number;
  
  @IsOptional()
  @IsString()
  @IsEnum(Part)
  part: string;
}
