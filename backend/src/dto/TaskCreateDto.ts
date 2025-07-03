import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class TaskCreateDto {
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  text!: string;
} 