import { Module } from '@nestjs/common';
import { GovernmentService } from './government.service';
import { GovernmentController } from './government.controller';

@Module({
  controllers: [GovernmentController],
  providers: [GovernmentService],
})
export class GovernmentModule {}
