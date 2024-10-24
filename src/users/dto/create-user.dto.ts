import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { UserRoleEnum } from '../../roles/userRole.interface';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username must be at least 3 characters long.',
    example: 'bruno',
  })
  @IsString()
  @IsNotEmpty({ message: 'The username cant be empty.' })
  @MinLength(3, {
    message: 'The username must be at least 3 characters long.',
  })
  username: string;

  @ApiProperty({
    description:
      'The password must be at least 6 characters long, contain letters, numbers, and special characters.',
    example: '17061990@bp',
  })
  @IsString()
  @IsNotEmpty({ message: 'The password cant be empty.' })
  @MinLength(6, { message: 'The password must be at least 6 characters long.' })
  @Matches(/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_])/, {
    message:
      'The password must contain letters, numbers, and special characters.',
  })
  password: string;

  @ApiProperty({
    description: 'Must be "admin" or "user".',
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty({ message: 'Role cant be empty.' })
  @IsIn(['admin', 'user'], { message: 'This role do not exists.' })
  role: UserRoleEnum;
}

export class UserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'The username of the user.', example: 'bruno' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Exclude()
  @ApiProperty({
    description: 'The password of the user.',
    example: '17061990@bp',
  })
  password: string;

  @ApiProperty({ description: 'The role of the user.', example: 'user' })
  @IsString()
  @IsNotEmpty()
  role: UserRoleEnum;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}

export class UserLoginDto extends PartialType(UserDto) {}
