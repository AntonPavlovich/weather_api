import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWeatherDataTable1697648380070 implements MigrationInterface {
  name = 'CreateWeatherDataTable1697648380070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "weather_data" ("id" SERIAL NOT NULL, "data" jsonb NOT NULL, CONSTRAINT "PK_6ee17d274a88f8036d2aa8ea9d1" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "weather_data"`);
  }
}
