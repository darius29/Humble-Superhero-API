import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  name: string;

  @IsString()
  superpower: string;

  @IsInt()
  @Min(1, { message: 'Humility score must be at least 1' })
  @Max(10, { message: 'Humility score cannot be more than 10' })
  humilityScore: number;
}
