import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { MovieEntity } from '../db/entities/movie.entity';
import { RatingEntity } from '../db/entities/rating.entity';
import { UserEntity } from '../db/entities/user.entity';
import { CreateRatingDto, RatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingsService } from './ratings.service';

const mockRatingRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
};

const mockUserRepository = {
  findOne: jest.fn(),
};

const mockMovieRepository = {
  findOne: jest.fn(),
};

describe('RatingsService', () => {
  let service: RatingsService;
  let ratingsRepository: typeof mockRatingRepository;
  let userRepository: typeof mockUserRepository;
  let movieRepository: typeof mockMovieRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingsService,
        {
          provide: getRepositoryToken(RatingEntity),
          useValue: mockRatingRepository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: mockMovieRepository,
        },
      ],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
    ratingsRepository = module.get<typeof mockRatingRepository>(
      getRepositoryToken(RatingEntity),
    );
    userRepository = module.get<typeof mockUserRepository>(
      getRepositoryToken(UserEntity),
    );
    movieRepository = module.get<typeof mockMovieRepository>(
      getRepositoryToken(MovieEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a rating', async () => {
      const createRatingDto: CreateRatingDto = {
        rating: 4,
        userId: uuid(),
        movieId: uuid(),
      };

      const userFound = { id: createRatingDto.userId };
      const movieFound = { id: createRatingDto.movieId };
      const savedRating = {
        id: uuid(),
        rating: createRatingDto.rating,
        user: userFound,
        movie: movieFound,
      };

      userRepository.findOne.mockResolvedValue(userFound);
      movieRepository.findOne.mockResolvedValue(movieFound);
      ratingsRepository.findOne.mockResolvedValue(null);
      ratingsRepository.save.mockResolvedValue(savedRating);

      const result = await service.create(createRatingDto);

      expect(result).toEqual(
        plainToInstance(RatingDto, {
          id: savedRating.id,
          rating: savedRating.rating,
          movie: movieFound,
          user: userFound,
        }),
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: createRatingDto.userId },
      });
      expect(movieRepository.findOne).toHaveBeenCalledWith({
        where: { id: createRatingDto.movieId },
      });
      expect(ratingsRepository.findOne).toHaveBeenCalledWith({
        where: { user: userFound, movie: movieFound },
      });
      expect(ratingsRepository.save).toHaveBeenCalledWith(
        expect.any(RatingEntity),
      );
    });

    it('should throw HttpException if rating already exists', async () => {
      const createRatingDto: CreateRatingDto = {
        rating: 4,
        userId: uuid(),
        movieId: uuid(),
      };

      const userFound = { id: createRatingDto.userId };
      const movieFound = { id: createRatingDto.movieId };
      const existingRating = { user: userFound, movie: movieFound };

      userRepository.findOne.mockResolvedValue(userFound);
      movieRepository.findOne.mockResolvedValue(movieFound);
      ratingsRepository.findOne.mockResolvedValue(existingRating);

      await expect(service.create(createRatingDto)).rejects.toThrow(
        HttpException,
      );
      expect(ratingsRepository.findOne).toHaveBeenCalledWith({
        where: { user: userFound, movie: movieFound },
      });
    });
  });

  describe('update', () => {
    it('should update a rating and return the updated rating', async () => {
      const id = uuid();
      const updateRatingDto: UpdateRatingDto = { rating: 5 };
      const existingRating = { id, rating: 4, movie: {}, user: {} };

      ratingsRepository.findOne.mockResolvedValue(existingRating);
      ratingsRepository.update.mockResolvedValue(undefined);

      const result = await service.update(id, updateRatingDto);

      expect(result).toEqual(
        plainToInstance(RatingDto, {
          id,
          rating: 5,
          movie: existingRating.movie,
          user: existingRating.user,
        }),
      );
      expect(ratingsRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(ratingsRepository.update).toHaveBeenCalledWith(
        id,
        expect.any(RatingEntity),
      );
    });

    it('should throw HttpException if rating not found', async () => {
      const id = uuid();
      const updateRatingDto: UpdateRatingDto = { rating: 4 };

      ratingsRepository.findOne.mockResolvedValue(null);

      await expect(service.update(id, updateRatingDto)).rejects.toThrow(
        HttpException,
      );
      expect(ratingsRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
