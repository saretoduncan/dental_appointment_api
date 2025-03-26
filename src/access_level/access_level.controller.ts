import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put, Query } from '@nestjs/common';
import { AccessLevelService } from './access_level.service';
import { IsNotEmpty } from 'class-validator';
import { AccessLevelReqDto, UpdateAccessLevelDto } from 'src/dto/accessLevel.dto';

@Controller('access-level')
export class AccessLevelController {
  constructor(private readonly accessLevelService: AccessLevelService) {}
  @Get()
  async getAllAccessLevels() {
    return await this.accessLevelService.getAllAccessLevels();
  }
  @Get("id")
  async getAccessLevelById(@Query('access_level_id')  id: string) {
    if(id===undefined) throw new HttpException('access_level_id query cannot be empty', HttpStatus.BAD_REQUEST);
    return await this.accessLevelService.getAccessLevelById(id);
  }
  @Get('/level')
  async getAccessLevelByLevel(@Query('access_level') accessLevel: string) {
    if(accessLevel===undefined) throw new HttpException('access_level query cannot be empty', HttpStatus.BAD_REQUEST);
    return await this.accessLevelService.findAccessLevelByLevel(accessLevel);
  }
  @Post()
  async createAccessLevel(@Body() newAccessLevel:AccessLevelReqDto) {
    return await this.accessLevelService.createAccessLevel(newAccessLevel.access_level);
  }
  @Put()
  async updateAccessLevel(@Body() accessLevelUpdate:UpdateAccessLevelDto){
    return await this.accessLevelService.updateAccessLevelById(accessLevelUpdate.id, accessLevelUpdate.access_level);
  }
  @Patch('revokeAccessLevel')
  async revokeAccessLevelByLevel(@Body() accessLevelRequestDto:AccessLevelReqDto){
    return this.accessLevelService.revokeAllAccessLevelByLevel(accessLevelRequestDto.access_level);
  }
  
  @Delete()
  async deleteAccessLevel(@Query('access_level_id') id:string){
    if(id===undefined) throw new HttpException('access_level_id query cannot be empty', HttpStatus.BAD_REQUEST);
    return await this.accessLevelService.deleteAccessLevelById(id);
  }

}
