import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Part } from '../enums';

type QueryValue = {
  lat: string,
  lon: string,
  part?: string
}

type Response = {
  lat: number,
  lon: number,
  part?: Part[]
}

@Injectable()
export class QueryValidationPipe implements PipeTransform {
  async transform(value: QueryValue, metadata: ArgumentMetadata) {
    try {
      if (!value.lat || !value.lon) {
        throw new Error('Lat and Lon params are required!')
      } 
      const lat = parseFloat(value.lat), 
      lon = parseFloat(value.lon), 
      part = value?.part?.split(',') ?? [];
      
      if (lat < -90 || lat > 90) {
        throw new Error('Lat must be within range -90:90!')
      }
      if (lon < -180 || lon > 180) {
        throw new Error('Lon must be within range -180:180!')
      }
      if (part?.length) {
        if (!part.every((value: Part) => Object.values(Part).includes(value))) {
          throw new Error(`Part argument, if provided, should receive such values: ${Object?.values(Part)?.join(', ')}. Separated by comma if you want to provide multiply values.`);
        }
      }

      return { lat, lon, part } as Response;
    } catch (ex) {
      throw new BadRequestException(ex.message)
    }
  }
}
