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
        INSERT INTO users (id, username, password, role, isactive) VALUES
            ('ea2ca597-a225-4a1c-9c5b-124e43511671', 'master-admin', '$2b$10$ZyJpr8mNY3uw5sLf6ZSb7.Mk5ecCqRKuWtd.Jhl7GljyucJUlZhsy', 'admin', true),
            ('cf81042c-9583-483a-a884-e292b7287a90', 'usuario01', '$2b$10$ZyJpr8mNY3uw5sLf6ZSb7.Mk5ecCqRKuWtd.Jhl7GljyucJUlZhsy', 'user', true),
            ('ac1f7432-2993-47d2-87eb-46b242e2bdfb', 'usuario02', '$2b$10$ZyJpr8mNY3uw5sLf6ZSb7.Mk5ecCqRKuWtd.Jhl7GljyucJUlZhsy', 'user', true),
            ('44875629-f7a8-41fd-a3e9-92faf596db32', 'usuario03', '$2b$10$ZyJpr8mNY3uw5sLf6ZSb7.Mk5ecCqRKuWtd.Jhl7GljyucJUlZhsy', 'user', true);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
