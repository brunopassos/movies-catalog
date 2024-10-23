import { MigrationInterface, QueryRunner } from 'typeorm';

export class MovieTable1729691634339 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE movies (
            id uuid NOT NULL PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL,
            director VARCHAR(255) NOT NULL,
            gender VARCHAR(255) NOT NULL,
            actors TEXT[] NOT NULL
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS movies;`);
  }
}
