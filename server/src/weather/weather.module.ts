import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherData } from 'src/database/entities/WeatherData';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeatherData]),
    HttpModule
  ],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
