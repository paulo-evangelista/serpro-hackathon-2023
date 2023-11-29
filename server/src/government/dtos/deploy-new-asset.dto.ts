import { IsDate, IsEmail, IsNumber, IsString, Matches, matches } from 'class-validator';

export class CreateAssetDto {
    @IsString()
    titleName: string;
    
    @IsString()
    titleSymbol: string;

    @IsString()
    annual: string;

    @IsString()
    ipfsImageURI: string;

    @IsNumber()
    percentageReturnPerYear: number;

    @IsNumber()
    total_supply: number;

    @IsNumber()
    available_supply: number;

    @IsNumber()
    price: number;

    @IsNumber()
    interest: number;

    @IsNumber()
    deadline: number;

    @IsString()
    address: string;
}
