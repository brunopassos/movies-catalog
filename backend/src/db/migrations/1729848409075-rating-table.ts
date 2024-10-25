import { MigrationInterface, QueryRunner } from 'typeorm';

export class RatingTable1729848409075 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE ratings (
            id uuid NOT NULL PRIMARY KEY,
            rating NUMERIC(2, 1) NOT NULL,
            movie_id uuid NOT NULL,
            user_id uuid NOT NULL,
            CONSTRAINT fk_movie
                FOREIGN KEY (movie_id) 
                REFERENCES movies (id)
                ON DELETE CASCADE,
            CONSTRAINT fk_user
                FOREIGN KEY (user_id)
                REFERENCES users (id)
                ON DELETE CASCADE
        );
        `);
    await queryRunner.query(`
      INSERT INTO ratings (id, user_id, movie_id, rating) VALUES
        (uuid_generate_v4(), '0fe460f5-a84d-4736-b01c-8b39b5bb923d', '029efb10-a8f8-4549-8e4a-879fd01e8c5d', 4),
        (uuid_generate_v4(), '32287c10-489c-4f5a-99aa-fd29bd0d3543', '029efb10-a8f8-4549-8e4a-879fd01e8c5d', 3),
        (uuid_generate_v4(), 'ac031255-d894-4f60-a973-fcb10487a3a6', '029efb10-a8f8-4549-8e4a-879fd01e8c5d', 2),

        (uuid_generate_v4(), '0fe460f5-a84d-4736-b01c-8b39b5bb923d', '1c29a9ae-305c-47be-bf82-7569d0d57661', 4),
        (uuid_generate_v4(), '32287c10-489c-4f5a-99aa-fd29bd0d3543', '1c29a9ae-305c-47be-bf82-7569d0d57661', 2),
        (uuid_generate_v4(), 'ac031255-d894-4f60-a973-fcb10487a3a6', '1c29a9ae-305c-47be-bf82-7569d0d57661', 3),

        (uuid_generate_v4(), '0fe460f5-a84d-4736-b01c-8b39b5bb923d', '2b3ba64e-894e-481a-b257-1581d1f07d19', 1),
        (uuid_generate_v4(), '32287c10-489c-4f5a-99aa-fd29bd0d3543', '2b3ba64e-894e-481a-b257-1581d1f07d19', 3),
        (uuid_generate_v4(), 'ac031255-d894-4f60-a973-fcb10487a3a6', '2b3ba64e-894e-481a-b257-1581d1f07d19', 0),

        (uuid_generate_v4(), '0fe460f5-a84d-4736-b01c-8b39b5bb923d', '62996587-637a-47b4-84b2-e49d1ea355f2', 3),
        (uuid_generate_v4(), '32287c10-489c-4f5a-99aa-fd29bd0d3543', '62996587-637a-47b4-84b2-e49d1ea355f2', 4),
        (uuid_generate_v4(), 'ac031255-d894-4f60-a973-fcb10487a3a6', '62996587-637a-47b4-84b2-e49d1ea355f2', 2),

        (uuid_generate_v4(), '0fe460f5-a84d-4736-b01c-8b39b5bb923d', '6d102d9f-06e4-4ddf-b007-121a543c0fef', 0),
        (uuid_generate_v4(), '32287c10-489c-4f5a-99aa-fd29bd0d3543', '6d102d9f-06e4-4ddf-b007-121a543c0fef', 1),
        (uuid_generate_v4(), 'ac031255-d894-4f60-a973-fcb10487a3a6', '6d102d9f-06e4-4ddf-b007-121a543c0fef', 4),

        (uuid_generate_v4(), '0fe460f5-a84d-4736-b01c-8b39b5bb923d', '724b05ef-8160-498b-a13c-be9cd8122eab', 3),
        (uuid_generate_v4(), '32287c10-489c-4f5a-99aa-fd29bd0d3543', '724b05ef-8160-498b-a13c-be9cd8122eab', 4),
        (uuid_generate_v4(), 'ac031255-d894-4f60-a973-fcb10487a3a6', '724b05ef-8160-498b-a13c-be9cd8122eab', 2),

        (uuid_generate_v4(), '0fe460f5-a84d-4736-b01c-8b39b5bb923d', '8dc81554-147a-41d2-9e3b-8f148b93883d', 4),
        (uuid_generate_v4(), '32287c10-489c-4f5a-99aa-fd29bd0d3543', '8dc81554-147a-41d2-9e3b-8f148b93883d', 0),
        (uuid_generate_v4(), 'ac031255-d894-4f60-a973-fcb10487a3a6', '8dc81554-147a-41d2-9e3b-8f148b93883d', 1),

        (uuid_generate_v4(), '0fe460f5-a84d-4736-b01c-8b39b5bb923d', '9f0c2f32-d0a3-4731-aa98-4d4b70f67ce4', 2),
        (uuid_generate_v4(), '32287c10-489c-4f5a-99aa-fd29bd0d3543', '9f0c2f32-d0a3-4731-aa98-4d4b70f67ce4', 3),
        (uuid_generate_v4(), 'ac031255-d894-4f60-a973-fcb10487a3a6', '9f0c2f32-d0a3-4731-aa98-4d4b70f67ce4', 1),

        (uuid_generate_v4(), '0fe460f5-a84d-4736-b01c-8b39b5bb923d', 'b50127b3-05c8-4d96-a44d-2346301b4dc4', 4),
        (uuid_generate_v4(), '32287c10-489c-4f5a-99aa-fd29bd0d3543', 'b50127b3-05c8-4d96-a44d-2346301b4dc4', 1),
        (uuid_generate_v4(), 'ac031255-d894-4f60-a973-fcb10487a3a6', 'b50127b3-05c8-4d96-a44d-2346301b4dc4', 3),

        (uuid_generate_v4(), '0fe460f5-a84d-4736-b01c-8b39b5bb923d', 'f344510c-c205-40af-bb61-0886d73a4934', 4),
        (uuid_generate_v4(), '32287c10-489c-4f5a-99aa-fd29bd0d3543', 'f344510c-c205-40af-bb61-0886d73a4934', 3),
        (uuid_generate_v4(), 'ac031255-d894-4f60-a973-fcb10487a3a6', 'f344510c-c205-40af-bb61-0886d73a4934', 0);

      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
