import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { SaveWeatherDataDto } from './dto/saveWeatherDataDto';
import { QueryValidationPipe } from './pipes/queryValidation.pipe';
import { GetWeatherDataDto } from './dto/getWeatherDataDto';
import { Reflector } from '@nestjs/core';
import { ConvertResponseInterceptor } from './interceptors/convertResponse.interseptor';

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
  
  @UseInterceptors(ConvertResponseInterceptor)
  @Get()
  async getWeatherData(@Query(QueryValidationPipe) query: GetWeatherDataDto) {
    try {
      return await this.weatherService.getWeatherData(query);
    } catch (ex) {
      throw new Error(ex)
    }
  }
}
