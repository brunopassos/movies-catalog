import { MigrationInterface, QueryRunner } from 'typeorm';

export class RatingTable1729691641914 implements MigrationInterface {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS ratings;`);
  }
}
