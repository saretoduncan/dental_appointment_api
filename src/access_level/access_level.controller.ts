import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccessLevelService } from './access_level.service';
import {
  AccessLevelReqDto,
  UpdateAccessLevelDto,
} from 'src/dto/accessLevel.dto';
import { AccessLevelGuard } from 'src/guards/accessLevelGuard.guard';
import { HasAccess } from 'src/decorators/hasAccess.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('access-level')
export class AccessLevelController {
  constructor(private readonly accessLevelService: AccessLevelService) {}

  @HasAccess('ADMIN')
  @UseGuards(AccessLevelGuard, JwtGuard)
  @Get()
  async getAllAccessLevels() {
    return await this.accessLevelService.getAllAccessLevels();
  }
  @HasAccess('ADMIN')
  @UseGuards(AccessLevelGuard, JwtGuard)
  @Get('id')
  async getAccessLevelById(@Query('access_level_id') id: string) {
    if (id === undefined)
      throw new HttpException(
        'access_level_id query cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    return await this.accessLevelService.getAccessLevelById(id);
  }
  @HasAccess('ADMIN')
  @UseGuards(AccessLevelGuard, JwtGuard)
  @Get('/level')
  async getAccessLevelByLevel(@Query('access_level') accessLevel: string) {
    if (accessLevel === undefined)
      throw new HttpException(
        'access_level query cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    return await this.accessLevelService.findAccessLevelByLevel(accessLevel);
  }
  @HasAccess('ADMIN')
  @UseGuards(AccessLevelGuard, JwtGuard)
  @Post()
  async createAccessLevel(@Body() newAccessLevel: AccessLevelReqDto) {
    return await this.accessLevelService.createAccessLevel(
      newAccessLevel.access_level,
    );
  }
  @HasAccess('ADMIN')
  @UseGuards(AccessLevelGuard, JwtGuard)
  @Put()
  async updateAccessLevel(@Body() accessLevelUpdate: UpdateAccessLevelDto) {
    return await this.accessLevelService.updateAccessLevelById(
      accessLevelUpdate.id,
      accessLevelUpdate.access_level,
    );
  }
  @HasAccess('ADMIN')
  @UseGuards(AccessLevelGuard, JwtGuard)
  @Patch('revokeAccessLevel')
  async revokeAccessLevelByLevel(
    @Body() accessLevelRequestDto: AccessLevelReqDto,
  ) {
    return this.accessLevelService.revokeAllAccessLevelByLevel(
      accessLevelRequestDto.access_level,
    );
  }
  @HasAccess('ADMIN')
  @UseGuards(JwtGuard, AccessLevelGuard)
  @Delete()
  async deleteAccessLevel(@Query('access_level_id') id: string) {
    if (id === undefined)
      throw new HttpException(
        'access_level_id query cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    return await this.accessLevelService.deleteAccessLevelById(id);
  }
}
