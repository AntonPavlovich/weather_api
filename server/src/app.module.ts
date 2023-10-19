import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';
import dataSource from './database/dataSource';

@Module({
  imports: [
    WeatherModule,
    TypeOrmModule.forRoot({ ...dataSource?.options }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
