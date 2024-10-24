import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../auth/auth.guard';
import { CreateRatingDto, RatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';

describe('RatingsController', () => {
  let controller: RatingsController;
  let service: RatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingsController],
      providers: [
        RatingsService,
        { provide: 'RatingEntityRepository', useValue: {} },
        { provide: 'UserEntityRepository', useValue: {} },
        { provide: 'MovieEntityRepository', useValue: {} },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('some-value'),
          },
        },
        {
          provide: AuthGuard,
          useClass: class {
            canActivate = jest.fn().mockReturnValue(true);
          },
        },
      ],
    }).compile();

    controller = module.get<RatingsController>(RatingsController);
    service = module.get<RatingsService>(RatingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new rating and return it', async () => {
      const createRatingDto: CreateRatingDto = {
        rating: 3,
        movieId: '544f78dd-2428-4b12-9c5d-954ac2669eb8',
        userId: '29868cc6-c776-415d-9160-eb5b4fa437d3',
      };
      const expectedRatingDto: RatingDto = {
        id: '1',
        ...createRatingDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedRatingDto);

      const result = await controller.create(createRatingDto);
      expect(result).toEqual(expectedRatingDto);
      expect(service.create).toHaveBeenCalledWith(createRatingDto);
    });
  });

  describe('update', () => {
    it('should update a rating and return it', async () => {
      const id = '1';
      const updateRatingDto: UpdateRatingDto = {
        rating: 4,
        movieId: '544f78dd-2428-4b12-9c5d-954ac2669eb8',
        userId: '29868cc6-c776-415d-9160-eb5b4fa437d3',
      };

      const expectedRatingDto: RatingDto = {
        id,
        rating: updateRatingDto.rating,
        movieId: updateRatingDto.movieId,
        userId: updateRatingDto.userId,
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedRatingDto);

      const result = await controller.update(id, updateRatingDto);
      expect(result).toEqual(expectedRatingDto);
      expect(service.update).toHaveBeenCalledWith(id, updateRatingDto);
    });
  });
});
