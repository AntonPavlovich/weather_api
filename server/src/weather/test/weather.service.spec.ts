import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from '../weather.service';
import { responseFromWeatherApi, weatherFullPartStub } from './stubs/weather';
import { Repository } from 'typeorm';
import { WeatherData } from '../../database/entities/WeatherData';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { config } from '../../config/config';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('WeatherService', () => {
  let weatherService: WeatherService;
  let weatherRepository: Repository<WeatherData>;
  let httpService: HttpService;

  const userRepositoryMock = {
    create: jest.fn().mockReturnValue({ aa: 'a' }),
    save: jest.fn().mockResolvedValue({ aa: 'a' }),
    findOne: jest.fn().mockResolvedValue({ data: responseFromWeatherApi() }),
  };

  const httpServiceMock = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [() => config],
        }),
      ],
      providers: [
        WeatherService,
        HttpService,
        {
          provide: getRepositoryToken(WeatherData),
          useValue: userRepositoryMock,
        },
      ],
    })
      .overrideProvider(HttpService)
      .useValue(httpServiceMock)
      .compile();

    weatherService = app.get<WeatherService>(WeatherService);
    weatherRepository = app.get<Repository<WeatherData>>(
      getRepositoryToken(WeatherData),
    );
    httpService = app.get<HttpService>(HttpService);

    expect(weatherService).toBeDefined();
    expect(weatherService).toBeInstanceOf(WeatherService);
  });

  describe('getWeatherDataFromExternalAPI', () => {
    it('Should return correct weather object', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(
          of({ data: responseFromWeatherApi() } as unknown as AxiosResponse),
        );

      expect(
        await weatherService.getWeatherDataFromExternalAPI(
          weatherFullPartStub(),
        ),
      ).toEqual(responseFromWeatherApi());
    });
  });

  describe('saveWeatherRecord', () => {
    it('Should return {status: "Saved"}', async () => {
      const expected = { status: 'Saved' };

      expect(
        await weatherService.saveWeatherRecord(responseFromWeatherApi()),
      ).toEqual(expected);
    });
  });

  describe('getWeatherData', () => {
    it('Should return data with all pars', async () => {
      const data = { lat: 12, lon: 12 };

      expect(await weatherService.getWeatherData(data)).toEqual(
        responseFromWeatherApi(),
      );
    });

    it('Should return data without current key', async () => {
      const data = { lat: 12, lon: 12, part: ['current'] };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { current, ...expected } = responseFromWeatherApi();

      expect(await weatherService.getWeatherData(data)).toEqual(expected);
    });
  });
});
