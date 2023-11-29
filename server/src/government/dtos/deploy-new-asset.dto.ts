import { IsDate, IsEmail, IsNumber, IsString, Matches, matches } from 'class-validator';
import { isBigInt64Array } from 'util/types';

export class CreateAssetDto {
    @IsString()
    titleName: string;
    
    @IsString()
    titleSymbol: string;

    //multiplicado por 100
    @IsNumber()
    annualProfitability: number;

    // com 2 casas decimais
    @IsNumber()
    unitPrice: number;

    @IsString()
    program: string;

    @IsString()
    lobby: string;

    //timestamp
    @IsNumber()
    launchDate: number;

    //timestamp
    @IsNumber()
    expirationDate: number;

    @IsNumber()
    amount: number;

    // com 2 casas decimais
    @IsNumber()
    financialAmount: number;

    @IsString()
    accountOpening: string;
}
