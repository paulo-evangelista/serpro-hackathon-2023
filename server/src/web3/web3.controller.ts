import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { CreateWeb3Dto } from './dto/create-web3.dto';
import { UpdateWeb3Dto } from './dto/update-web3.dto';

@Controller('web3')
export class Web3Controller {
  constructor(private readonly web3Service: Web3Service) {}

  @Post()
  create(@Body() createWeb3Dto: CreateWeb3Dto) {
    return this.web3Service.create(createWeb3Dto);
  }

  @Get()
  findAll() {
    return this.web3Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.web3Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeb3Dto: UpdateWeb3Dto) {
    return this.web3Service.update(+id, updateWeb3Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.web3Service.remove(+id);
  }
}
