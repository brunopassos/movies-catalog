import { MigrationInterface, QueryRunner } from 'typeorm';

export class MovieTable1729848398697 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE movies (
            id uuid NOT NULL PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL,
            director VARCHAR(255) NOT NULL,
            gender VARCHAR(255) NOT NULL,
            actors TEXT[] NOT NULL,
	        image_url TEXT
        );`);
    await queryRunner.query(`
        INSERT INTO movies (id, title, director, gender, actors, image_url) VALUES
        ('054f7e94-6464-407f-baec-f43586fd6cc2', 'Inception', 'Christopher Nolan', 'Sci-Fi', ARRAY['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'], 'https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF894,1000_QL80_.jpg'),
        ('0a8c2702-505f-4b96-a58b-e19c10751f2f', 'The Dark Knight', 'Christopher Nolan', 'Action', ARRAY['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'], 'https://m.media-amazon.com/images/S/pv-target-images/e9a43e647b2ca70e75a3c0af046c4dfdcd712380889779cbdc2c57d94ab63902.jpg'),
        ('c1d83309-3952-4c40-879d-aa833e5ef815', 'Interstellar', 'Christopher Nolan', 'Sci-Fi', ARRAY['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'], 'https://upload.wikimedia.org/wikipedia/pt/3/3a/Interstellar_Filme.png'),
        ('a879ecbf-3c52-4fc3-b011-6ed7863c3c51', 'The Matrix', 'Lana Wachowski, Lilly Wachowski', 'Action', ARRAY['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'], 'https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_.jpg'),
        ('61e1018a-b910-490d-9526-e7db6181478c', 'Pulp Fiction', 'Quentin Tarantino', 'Crime', ARRAY['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'], 'https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_.jpg'),
        ('79787cc0-7996-4841-be54-c457aa571dd1', 'The Shawshank Redemption', 'Frank Darabont', 'Drama', ARRAY['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'], 'https://m.media-amazon.com/images/I/61-vQDr7ecL._AC_UF894,1000_QL80_.jpg'),
        ('cbd2e0c2-90c9-4f38-b8e9-e38a56cdf0fe', 'Fight Club', 'David Fincher', 'Drama', ARRAY['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter'], 'https://m.media-amazon.com/images/I/71QPnEkXygS._AC_UF894,1000_QL80_.jpg'),
        ('994af7c0-bfed-4d64-8a7a-8fed95d4c0ea', 'Forrest Gump', 'Robert Zemeckis', 'Drama', ARRAY['Tom Hanks', 'Robin Wright', 'Gary Sinise'], 'https://upload.wikimedia.org/wikipedia/pt/c/c0/ForrestGumpPoster.jpg'),
        ('9378b1b2-dcc3-4f2c-b360-b1d359ddfe43', 'The Godfather', 'Francis Ford Coppola', 'Crime', ARRAY['Marlon Brando', 'Al Pacino', 'James Caan'], 'https://m.media-amazon.com/images/M/MV5BYTJkNGQyZDgtZDQ0NC00MDM0LWEzZWQtYzUzZDEwMDljZWNjXkEyXkFqcGc@._V1_.jpg'),
        ('1099376c-7c66-44fb-958a-6841bc03dbd2', 'Gladiator', 'Ridley Scott', 'Action', ARRAY['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen'], 'https://m.media-amazon.com/images/I/51GA6V6VE1L._AC_UF894,1000_QL80_.jpg');
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
