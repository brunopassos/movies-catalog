import { ConflictException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { MovieEntity } from '../db/entities/movie.entity';
import { CreateMovieDto, MovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

const mockMoviesRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('MoviesService', () => {
  let service: MoviesService;
  let moviesRepository: MockRepository<MovieEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: 'MovieEntityRepository', useValue: mockMoviesRepository },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<MockRepository<MovieEntity>>(
      'MovieEntityRepository',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'Inception',
        director: 'Christopher Nolan',
        gender: 'Sci-Fi',
        actors: ['Leonardo DiCaprio'],
        image_url: 'fake_url',
      };

      moviesRepository.findOne.mockResolvedValue(null);
      const savedMovie = { id: uuid(), ...createMovieDto };
      moviesRepository.save.mockResolvedValue(savedMovie);

      const result = await service.create(createMovieDto);

      expect(result).toEqual({ ...savedMovie, rating: 0 });
      expect(moviesRepository.findOne).toHaveBeenCalledWith({
        where: { title: createMovieDto.title },
      });
      expect(moviesRepository.save).toHaveBeenCalledWith(
        expect.any(MovieEntity),
      );
    });

    it('should throw a ConflictException if movie already exists', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'Inception',
        director: 'Christopher Nolan',
        gender: 'Sci-Fi',
        actors: ['Leonardo DiCaprio'],
        image_url: 'fake_url',
      };

      moviesRepository.findOne.mockResolvedValue({ title: 'Inception' });

      await expect(service.create(createMovieDto)).rejects.toThrow(
        ConflictException,
      );
      expect(moviesRepository.findOne).toHaveBeenCalledWith({
        where: { title: createMovieDto.title },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const result: MovieDto[] = [
        {
          id: '1',
          title: 'Inception',
          director: 'Christopher Nolan',
          gender: 'Sci-Fi',
          actors: ['Leonardo DiCaprio'],
          rating: 4.0,
          image_url: 'fake_url',
        },
      ];

      const mockMovies = [
        {
          id: '1',
          title: 'Inception',
          director: 'Christopher Nolan',
          gender: 'Sci-Fi',
          actors: ['Leonardo DiCaprio'],
          ratings: [{ rating: 4 }, { rating: 4 }],
          image_url: 'fake_url',
        },
      ];

      jest.spyOn(moviesRepository, 'find').mockResolvedValue(mockMovies);

      const movies = await service.findAll();

      expect(movies).toEqual(result);
      expect(moviesRepository.find).toHaveBeenCalledWith({
        relations: ['ratings'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a movie by id', async () => {
      const result: MovieDto = {
        id: '1',
        title: 'Inception',
        director: 'Christopher Nolan',
        gender: 'Sci-Fi',
        actors: ['Leonardo DiCaprio'],
        rating: 4,
        image_url: 'fake_url',
      };

      moviesRepository.findOne.mockResolvedValue(result);

      const movie = await service.findOne('1');
      expect(movie).toEqual(plainToInstance(MovieDto, result));
      expect(moviesRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw HttpException if movie not found', async () => {
      moviesRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existing-id')).rejects.toThrow(
        HttpException,
      );
      expect(moviesRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'non-existing-id' },
      });
    });
  });

  describe('update', () => {
    it('should update a movie and return the updated movie', async () => {
      const id = '1';
      const updateMovieDto: UpdateMovieDto = {
        title: 'Inception Part II',
      };

      const existingMovie = {
        id,
        title: 'Inception',
        director: 'Christopher Nolan',
        gender: 'Sci-Fi',
        actors: ['Leonardo DiCaprio'],
      };

      moviesRepository.findOne.mockResolvedValue(existingMovie);
      moviesRepository.update.mockResolvedValue(undefined);

      const result = await service.update(id, updateMovieDto);

      expect(result).toEqual(
        plainToInstance(MovieDto, { ...existingMovie, ...updateMovieDto }),
      );
      expect(moviesRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(moviesRepository.update).toHaveBeenCalledWith(
        id,
        expect.any(MovieEntity),
      );
    });

    it('should throw HttpException if movie not found', async () => {
      const id = 'non-existing-movie-id';
      const updateMovieDto: UpdateMovieDto = { title: 'Updated Title' };

      moviesRepository.findOne.mockResolvedValue(null);

      await expect(service.update(id, updateMovieDto)).rejects.toThrow(
        HttpException,
      );
      expect(moviesRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
