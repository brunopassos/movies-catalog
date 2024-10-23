import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'The username cant be empty.' })
  @MinLength(3, {
    message: 'The usrename must be at least 3 characters long.',
  })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'The password cant be empty.' })
  @MinLength(6, { message: 'The password must be at least 6 characters long.' })
  @Matches(/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_])/, {
    message:
      'The password must contain letters, numbers, and special characters.',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Role cant be empty.' })
  @IsIn(['admin', 'user'], { message: 'This role do not exists.' })
  role: 'admin' | 'user';
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
