import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    description: 'enter email address',
    default: 'test@test.com',
    required: true,
  })
  @IsNotEmpty({ message: () => 'E-mail cannot be empty!' })
  @IsEmail({}, { message: 'Please check the email format!' })
  @MaxLength(100, { message: () => 'Character limit exceeded!' })
  email: string;

  @ApiProperty({
    description: 'enter password',
    default: 'Aa123456789',
    required: true,
  })
  @IsNotEmpty({ message: () => 'Password cannot be empty!' })
  @MaxLength(45, { message: () => 'Character limit exceeded!' })
  password: string;
}

export class RegisterDTO {
  @ApiProperty({
    description: 'name  required',
    default: 'muhammet',
    required: true,
  })
  @IsNotEmpty({ message: () => 'Name cannot be empty!' })
  @MinLength(2, { message: () => 'Name must contain at least 2 character!' })
  @MaxLength(45, {
    message: () => 'Character limit exceeded!',
  })
  name: string;

  @ApiProperty({
    description: 'email  required',
    default: 'test@test.com',
    required: true,
  })
  @IsNotEmpty({ message: () => 'E-mail cannot be empty!' })
  @IsEmail({}, { message: 'Please check the email format!' })
  @MaxLength(100, { message: () => 'Character limit exceeded!' })
  email: string;

  @ApiProperty({
    description: 'password  required',
    default: 'Aa123456789',
    required: true,
  })
  @IsNotEmpty({ message: 'Password cannot be empty!' })
  @MinLength(8, { message: 'Password must contain at least 8 characters!' })
  @MaxLength(45, { message: 'Password can contain maximum 45 chars!' })
  @Matches(/((?=.*\d))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 uppercase, 1 lowercase and 1 number!',
  })
  password: string;
}
