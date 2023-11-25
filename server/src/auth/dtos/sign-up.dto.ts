import { IsEmail, IsEthereumAddress, IsString } from 'class-validator';

export class SignUpDto {
    @IsEthereumAddress()
    ethWallet: string;

    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}
