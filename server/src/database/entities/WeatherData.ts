import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('weather_data')
export class WeatherData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
  })
  lat: number

  @Column({
    type: 'decimal'
  })
  lon: number

  @Column({
    type: 'jsonb',
    nullable: false
  })
  data: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date
}
