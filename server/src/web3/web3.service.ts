import { Injectable } from '@nestjs/common';
import { CreateWeb3Dto } from './dto/create-web3.dto';
import { UpdateWeb3Dto } from './dto/update-web3.dto';

@Injectable()
export class Web3Service {
  create(createWeb3Dto: CreateWeb3Dto) {
    return 'This action adds a new web3';
  }

  findAll() {
    return `This action returns all web3`;
  }

  findOne(id: number) {
    return `This action returns a #${id} web3`;
  }

  update(id: number, updateWeb3Dto: UpdateWeb3Dto) {
    return `This action updates a #${id} web3`;
  }

  remove(id: number) {
    return `This action removes a #${id} web3`;
  }
}
