import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAtColumnToTheWeatherTable1697663864722
  implements MigrationInterface
{
  name = 'AddCreatedAtColumnToTheWeatherTable1697663864722';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "weather_data" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "weather_data" DROP COLUMN "createdAt"`,
    );
  }
}
