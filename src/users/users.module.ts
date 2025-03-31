import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SeederService } from './seeder.service';

@Global()
@Module({
  controllers: [UsersController],
  providers: [UsersService, SeederService],
  exports: [UsersService],
})
export class UsersModule {}
