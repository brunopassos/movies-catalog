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
        (uuid_generate_v4(), 'cf81042c-9583-483a-a884-e292b7287a90', '054f7e94-6464-407f-baec-f43586fd6cc2', 4),
        (uuid_generate_v4(), 'ac1f7432-2993-47d2-87eb-46b242e2bdfb', '054f7e94-6464-407f-baec-f43586fd6cc2', 3),
        (uuid_generate_v4(), '44875629-f7a8-41fd-a3e9-92faf596db32', '054f7e94-6464-407f-baec-f43586fd6cc2', 2),

        (uuid_generate_v4(), 'cf81042c-9583-483a-a884-e292b7287a90', '0a8c2702-505f-4b96-a58b-e19c10751f2f', 4),
        (uuid_generate_v4(), 'ac1f7432-2993-47d2-87eb-46b242e2bdfb', '0a8c2702-505f-4b96-a58b-e19c10751f2f', 2),
        (uuid_generate_v4(), '44875629-f7a8-41fd-a3e9-92faf596db32', '0a8c2702-505f-4b96-a58b-e19c10751f2f', 3),

        (uuid_generate_v4(), 'cf81042c-9583-483a-a884-e292b7287a90', 'c1d83309-3952-4c40-879d-aa833e5ef815', 1),
        (uuid_generate_v4(), 'ac1f7432-2993-47d2-87eb-46b242e2bdfb', 'c1d83309-3952-4c40-879d-aa833e5ef815', 3),
        (uuid_generate_v4(), '44875629-f7a8-41fd-a3e9-92faf596db32', 'c1d83309-3952-4c40-879d-aa833e5ef815', 0),

        (uuid_generate_v4(), 'cf81042c-9583-483a-a884-e292b7287a90', 'a879ecbf-3c52-4fc3-b011-6ed7863c3c51', 3),
        (uuid_generate_v4(), 'ac1f7432-2993-47d2-87eb-46b242e2bdfb', 'a879ecbf-3c52-4fc3-b011-6ed7863c3c51', 4),
        (uuid_generate_v4(), '44875629-f7a8-41fd-a3e9-92faf596db32', 'a879ecbf-3c52-4fc3-b011-6ed7863c3c51', 2),

        (uuid_generate_v4(), 'cf81042c-9583-483a-a884-e292b7287a90', '61e1018a-b910-490d-9526-e7db6181478c', 0),
        (uuid_generate_v4(), 'ac1f7432-2993-47d2-87eb-46b242e2bdfb', '61e1018a-b910-490d-9526-e7db6181478c', 1),
        (uuid_generate_v4(), '44875629-f7a8-41fd-a3e9-92faf596db32', '61e1018a-b910-490d-9526-e7db6181478c', 4),

        (uuid_generate_v4(), 'cf81042c-9583-483a-a884-e292b7287a90', '79787cc0-7996-4841-be54-c457aa571dd1', 3),
        (uuid_generate_v4(), 'ac1f7432-2993-47d2-87eb-46b242e2bdfb', '79787cc0-7996-4841-be54-c457aa571dd1', 4),
        (uuid_generate_v4(), '44875629-f7a8-41fd-a3e9-92faf596db32', '79787cc0-7996-4841-be54-c457aa571dd1', 2),

        (uuid_generate_v4(), 'cf81042c-9583-483a-a884-e292b7287a90', 'cbd2e0c2-90c9-4f38-b8e9-e38a56cdf0fe', 4),
        (uuid_generate_v4(), 'ac1f7432-2993-47d2-87eb-46b242e2bdfb', 'cbd2e0c2-90c9-4f38-b8e9-e38a56cdf0fe', 0),
        (uuid_generate_v4(), '44875629-f7a8-41fd-a3e9-92faf596db32', 'cbd2e0c2-90c9-4f38-b8e9-e38a56cdf0fe', 1),

        (uuid_generate_v4(), 'cf81042c-9583-483a-a884-e292b7287a90', '994af7c0-bfed-4d64-8a7a-8fed95d4c0ea', 2),
        (uuid_generate_v4(), 'ac1f7432-2993-47d2-87eb-46b242e2bdfb', '994af7c0-bfed-4d64-8a7a-8fed95d4c0ea', 3),
        (uuid_generate_v4(), '44875629-f7a8-41fd-a3e9-92faf596db32', '994af7c0-bfed-4d64-8a7a-8fed95d4c0ea', 1),

        (uuid_generate_v4(), 'cf81042c-9583-483a-a884-e292b7287a90', '9378b1b2-dcc3-4f2c-b360-b1d359ddfe43', 4),
        (uuid_generate_v4(), 'ac1f7432-2993-47d2-87eb-46b242e2bdfb', '9378b1b2-dcc3-4f2c-b360-b1d359ddfe43', 1),
        (uuid_generate_v4(), '44875629-f7a8-41fd-a3e9-92faf596db32', '9378b1b2-dcc3-4f2c-b360-b1d359ddfe43', 3),

        (uuid_generate_v4(), 'cf81042c-9583-483a-a884-e292b7287a90', '1099376c-7c66-44fb-958a-6841bc03dbd2', 4),
        (uuid_generate_v4(), 'ac1f7432-2993-47d2-87eb-46b242e2bdfb', '1099376c-7c66-44fb-958a-6841bc03dbd2', 3),
        (uuid_generate_v4(), '44875629-f7a8-41fd-a3e9-92faf596db32', '1099376c-7c66-44fb-958a-6841bc03dbd2', 0);

      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
