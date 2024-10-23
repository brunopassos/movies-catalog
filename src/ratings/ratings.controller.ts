import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserRoleEnum } from 'src/roles/userRole.interface';
import { CreateRatingDto, RatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingsService } from './ratings.service';

@UseGuards(AuthGuard)
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  @Post()
  async create(@Body() createRatingDto: CreateRatingDto): Promise<RatingDto> {
    return await this.ratingsService.create(createRatingDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ): Promise<RatingDto> {
    return await this.ratingsService.update(id, updateRatingDto);
  }
}
