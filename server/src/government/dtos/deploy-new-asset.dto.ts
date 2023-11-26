import { IsDate, IsEmail, IsNumber, IsString, Matches, matches } from 'class-validator';

export class CreateAssetDto {
    @IsString()
    name: string;

  @IsString()
  description: string;

  @IsString()
  ipfsImageURI: string;

  @IsNumber()
  PercentageReturnPerYear: number

  @IsDate
}
