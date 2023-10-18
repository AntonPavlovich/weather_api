import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherData } from 'src/database/entities/WeatherData';
import { Repository } from 'typeorm';
import { SaveWeatherDataDto } from './dto/getWeatherDataDto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherData)
    private readonly weatherRepository: Repository<WeatherData>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async getWeatherDataFromExternalAPI(saveWeatherDto: SaveWeatherDataDto) {
    const { baseUrl, apiKey } = this.configService.get('weatherApi');
    const { lat, lon, part } = saveWeatherDto;

    const { data } = await firstValueFrom(
      this.httpService.get(baseUrl, {
        params: {
          lat,
          lon,
          exclude: part,
          appid: apiKey
        }
      }).pipe(
        catchError((error: AxiosError) => {
          throw error;
        })
      )
    )
    return data;
  }  

  async saveWeatherRecord(weatherData) {
    const resp = this.weatherRepository.create({ data: weatherData });
    await this.weatherRepository.save(resp);
    return { status: 'Saved' };
  }

  async getWeatherData() {
    return;
  }
}
