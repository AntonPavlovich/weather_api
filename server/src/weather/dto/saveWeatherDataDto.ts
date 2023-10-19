import { IsArray, IsEnum, IsNumber, IsOptional, Max, Min } from "class-validator";
import { Part } from "../enums";

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
  @IsArray()
  @IsEnum(Part, { each: true })
  part: string[];
}
