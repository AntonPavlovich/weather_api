import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from '../weather.controller';
import { WeatherService } from '../weather.service';
import {
  queryObject,
  responseFromWeatherApi,
  weatherFullPartStub,
} from './stubs/weather';

describe('WeatherController', () => {
  let weatherController: WeatherController;
  let weatherService: WeatherService;

  const weatherServiceMock = {
    getWeatherDataFromExternalAPI: jest
      .fn()
      .mockResolvedValue(responseFromWeatherApi()),
    saveWeatherRecord: jest.fn().mockResolvedValue({ status: 'Saved' }),
    getWeatherData: jest.fn().mockResolvedValue(responseFromWeatherApi()),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService],
    })
      .overrideProvider(WeatherService)
      .useValue(weatherServiceMock)
      .compile();

    weatherController = app.get<WeatherController>(WeatherController);
    weatherService = app.get<WeatherService>(WeatherService);
  });

  describe('POST /weather', () => {
    it('Shoul return {status: Saved} object', async () => {
      const expected = { status: 'Saved' };

      expect(
        await weatherController.saveWeatherData(weatherFullPartStub()),
      ).toEqual(expected);
    });

    describe('When saveWeatherData method is called', () => {
      it('Should invoke weatherService.getWeatherDataFromExternalAPI', () => {
        expect(weatherService.getWeatherDataFromExternalAPI).toHaveBeenCalled();
      });

      it('Should invoke weatherService.saveWeatherRecord', () => {
        expect(weatherService.saveWeatherRecord).toHaveBeenCalled();
      });
    });
  });

  describe('GET /weather', () => {
    it('Should return weatherData object', async () => {
      expect(await weatherController.getWeatherData(queryObject())).toEqual(
        responseFromWeatherApi(),
      );
    });
  });
});
