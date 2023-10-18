import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLatAndLonColumnToWeatherDataTable1697663050842 implements MigrationInterface {
    name = 'AddLatAndLonColumnToWeatherDataTable1697663050842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weather_data" ADD "lat" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weather_data" ADD "lon" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weather_data" DROP COLUMN "lon"`);
        await queryRunner.query(`ALTER TABLE "weather_data" DROP COLUMN "lat"`);
    }

}
