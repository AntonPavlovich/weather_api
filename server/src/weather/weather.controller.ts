import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { SaveWeatherDataDto } from './dto/getWeatherDataDto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async saveWeatherData(@Body() saveWeatherDto: SaveWeatherDataDto) {
    try {
      const data = await this.weatherService.getWeatherDataFromExternalAPI(saveWeatherDto)
      return this.weatherService.saveWeatherRecord(data);
    } catch (ex) {
      throw new Error(ex)
    }
  }

  @Get()
  async getWeatherData(@Query() query) {
    console.log(query);
    return this.weatherService.getWeatherData();
  }
}
