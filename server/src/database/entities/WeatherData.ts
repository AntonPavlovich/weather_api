import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('weather_data')
export class WeatherData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'jsonb',
    nullable: false
  })
  data: string
}