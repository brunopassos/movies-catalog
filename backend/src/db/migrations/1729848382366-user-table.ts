import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1729848382366 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE role AS ENUM ('admin', 'user');`);
    await queryRunner.query(`
        CREATE TABLE users (
            id uuid NOT NULL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role role NOT NULL,
            isActive BOOLEAN NOT NULL DEFAULT true
        );`);
    await queryRunner.query(`
        INSERT INTO users (id, username, password, role, status) VALUES
            ('ea2ca597-a225-4a1c-9c5b-124e43511671', 'master-admin', '$2b$10$ZyJpr8mNY3uw5sLf6ZSb7.Mk5ecCqRKuWtd.Jhl7GljyucJUlZhsy', 'admin', true);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
