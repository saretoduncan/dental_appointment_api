import { Global, Module } from '@nestjs/common';
import { AccessLevelService } from './access_level.service';
import { AccessLevelController } from './access_level.controller';

@Global()
@Module({
  providers: [AccessLevelService],
  controllers: [AccessLevelController],
  exports: [AccessLevelService],
})
export class AccessLevelModule {}
