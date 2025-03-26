import { Module } from '@nestjs/common';
import { AccessLevelService } from './access_level.service';
import { AccessLevelController } from './access_level.controller';

@Module({
  providers: [AccessLevelService],
  controllers: [AccessLevelController]
})
export class AccessLevelModule {}
