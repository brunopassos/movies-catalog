import { Exclude } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  role: string;
}

export class UserDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @Exclude()
  password: string;
  @IsString()
  @IsNotEmpty()
  role: string;
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
