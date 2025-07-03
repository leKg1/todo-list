import { IsOptional, IsString, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class TaskUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  text?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
} 