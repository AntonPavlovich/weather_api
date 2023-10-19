import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherData } from '../database/entities/WeatherData';
import { Repository } from 'typeorm';
import { SaveWeatherDataDto } from './dto/saveWeatherDataDto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { omit } from '../utils/omitKey';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherData)
    private readonly weatherRepository: Repository<WeatherData>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWeatherDataFromExternalAPI(saveWeatherDto: SaveWeatherDataDto) {
    const { baseUrl, apiKey: appid } = this.configService.get('weatherApi');
    const { lat, lon, part } = saveWeatherDto;
    const exclude = part?.join(',');

    const { data } = await firstValueFrom(
      this.httpService
        .get(baseUrl, {
          params: {
            lat,
            lon,
            exclude,
            appid,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
    return data;
  }

  async saveWeatherRecord(weatherData) {
    const { lon, lat } = weatherData;
    const resp = this.weatherRepository.create({ lon, lat, data: weatherData });
    await this.weatherRepository.save(resp);
    return { status: 'Saved' };
  }

  async getWeatherData(getWeatherData) {
    const { lat, lon, part = '' } = getWeatherData;

    const { data } = await this.weatherRepository.findOne({
      where: {
        lat,
        lon,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (part?.length) {
      return part?.reduce((acc, curr) => {
        return omit(curr, acc);
      }, data);
    }
    return data;
  }
}
