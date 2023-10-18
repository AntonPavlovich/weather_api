import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './database/dataSource'
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';

@Module({
  imports: [
    WeatherModule, 
    TypeOrmModule.forRoot({ ...dataSource?.options }),
    ConfigModule.forRoot({
      load: [() => config]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
