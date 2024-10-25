import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { UserRoleEnum } from '../roles/userRole.interface';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.findOne(id);
  }

  @Patch(':id/deactivate')
  async deactivateUser(@Param('id') id: string): Promise<void> {
    await this.userService.deactivateUser(id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Patch(':id/activate')
  async activateUser(@Param('id') id: string): Promise<void> {
    await this.userService.activateUser(id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return await this.userService.update(id, updateUserDto);
  }
}
