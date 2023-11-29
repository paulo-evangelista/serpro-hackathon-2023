import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Web3Service } from 'src/web3/web3.service';
import { Repository } from 'typeorm';
import { isAddress } from 'ethers';
@Injectable()
export class PaymentsService {
    constructor(
        @Inject(Web3Service) private readonly web3service: Web3Service,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}
    async pix(amount: bigint, email: string) {
        amount = BigInt(amount);
        if (!amount || !email) throw new BadRequestException('amount or email is missing');
        if (amount < 1) throw new BadRequestException('amount must be greater than 0');

        const user = await this.userRepository.findOne({ where: {email: email} });

        if (!user) throw new BadRequestException('user not found');
        if (!user.wallet || !isAddress(user.wallet)) throw new BadRequestException('user has no wallet or wallet is invalid');

        amount = amount*(10n**16n)

        const txHash = await this.web3service.mintDrex(user.wallet, amount);
        console.log("tx done with hash ", txHash)

        const newBalance = BigInt(user.drexBalance) + amount;
        console.log(newBalance)
        console.log(newBalance.toString())
        return await this.userRepository.update({email: email}, {drexBalance: newBalance.toString()});
        
    }
    
}
