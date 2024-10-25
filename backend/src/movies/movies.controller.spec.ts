import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { CreateMovieDto, MovieDto } from './dto/create-movie.dto';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        { provide: 'MovieEntityRepository', useValue: {} },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
        {
          provide: RolesGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'JWT_SECRET') {
                return 'test-secret';
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new movie and return it', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'The Lord of The Rings: The Fellowship of the Ring',
        director: 'Peter Jackson',
        gender: 'Fantasia',
        actors: ['Elijah Wood', 'Ian McKellen', 'Sean Astin'],
      };
      const expectedMovieDto: MovieDto = {
        id: '1',
        ...createMovieDto,
        rating: 8.8,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedMovieDto);

      const result = await controller.create(createMovieDto);
      expect(result).toEqual(expectedMovieDto);
      expect(service.create).toHaveBeenCalledWith(createMovieDto);
    });
  });

  describe('findWithFilters', () => {
    it('should return a list of movies based on filters', async () => {
      const filters = {
        title: 'Inception',
        director: 'Nolan',
        gender: 'Sci-Fi',
        actors: ['DiCaprio'],
      };
      const expectedMovies: MovieDto[] = [
        {
          id: '1',
          title: 'Inception',
          director: 'Nolan',
          gender: 'Sci-Fi',
          actors: ['DiCaprio'],
          rating: 8.8,
        },
      ];

      jest.spyOn(service, 'findWithFilters').mockResolvedValue(expectedMovies);

      const result = await controller.findWithFilters(
        filters.title,
        filters.director,
        filters.gender,
        filters.actors,
      );
      expect(result).toEqual(expectedMovies);
      expect(service.findWithFilters).toHaveBeenCalledWith(filters);
    });
  });

  describe('findAll', () => {
    it('should return all movies', async () => {
      const expectedMovies: MovieDto[] = [
        {
          id: '1',
          title: 'Inception',
          director: 'Nolan',
          gender: 'Sci-Fi',
          actors: ['DiCaprio'],
          rating: 8.8,
        },
        {
          id: '2',
          title: 'Titanic',
          director: 'Cameron',
          gender: 'Drama',
          actors: ['DiCaprio', 'Winslet'],
          rating: 7.8,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedMovies);

      const result = await controller.findAll();
      expect(result).toEqual(expectedMovies);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a movie by id', async () => {
      const id = '1';
      const expectedMovieDto: MovieDto = {
        id,
        title: 'Inception',
        director: 'Nolan',
        gender: 'Sci-Fi',
        actors: ['DiCaprio'],
        rating: 8.8,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedMovieDto);

      const result = await controller.findOne(id);
      expect(result).toEqual(expectedMovieDto);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a movie and return it', async () => {
      const id = '1';
      const updateMovieDto: CreateMovieDto = {
        title: 'The Lord of The Rings: The Return of the King',
        director: 'Peter Jackson',
        gender: 'Fantasia',
        actors: ['Elijah Wood', 'Ian McKellen', 'Sean Astin'],
      };
      const expectedMovieDto: MovieDto = {
        id,
        ...updateMovieDto,
        rating: 9.0,
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedMovieDto);

      const result = await controller.update(id, updateMovieDto);
      expect(result).toEqual(expectedMovieDto);
      expect(service.update).toHaveBeenCalledWith(id, updateMovieDto);
    });
  });
});
