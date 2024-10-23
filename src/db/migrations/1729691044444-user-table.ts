import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1729691044444 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE role AS ENUM ('admin', 'user');`);
    await queryRunner.query(`
        CREATE TABLE users (
            id uuid NOT NULL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role role NOT NULL
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users;`);
  }
}
