import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProfileDto, UsersDtoReq } from 'src/dto/users.dto';
import { AuthGuard } from '@nestjs/passport';
import { AccessLevelGuard } from 'src/guards/accessLevelGuard.guard';
import { HasAccess } from 'src/decorators/hasAccess.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post() //create user
  async createUser(@Body() userInfo: UsersDtoReq) {
    return await this.userService.createUser(
      userInfo.first_name,
      userInfo.last_name,
      userInfo.password,
      userInfo.confirmPassword,
      userInfo.phone_number,
      userInfo.email,
      userInfo.work_email,
      userInfo.national_id_no,
      userInfo.job_title,
      userInfo.keen_first_name,
      userInfo.keen_last_name,
      userInfo.keen_phone_number,
      userInfo.keen_relationship,
      userInfo.middle_name,
      userInfo.keen_email_address,
    );
  }
  @HasAccess('ADMIN')
  @UseGuards(JwtGuard, AccessLevelGuard)
  @Get('all') //get all users
  async getAllUsers() {
    return await this.userService.getAllUser();
  }

  @Get() //get user by id
  @UseGuards(JwtGuard)
  async getUserById(@Query('userId') userId: string) {
    if (!userId?.trim()) {
      throw new HttpException(
        'USER ID is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userService.getUserById(userId);
  }
  @UseGuards(JwtGuard)
  @Put('updateUserProfile') //update user profile
  async updateUserProfile(
    @Query('userId') userId: string,
    @Body() userInfo: UserProfileDto,
  ) {
    if (!userId?.trim()) {
      throw new HttpException(
        'USER ID is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userService.updateUserProfile(userId, userInfo);
  }
  @UseGuards(JwtGuard)
  @Patch('revokeAccessLevel') //revoke user
  async revokeAccessLevel(
    @Query('accessLevelId') accessLevelId: string,
    @Query('userId') userId: string,
  ) {
    if (!userId?.trim() || !accessLevelId?.trim()) {
      throw new HttpException(
        'USER ID and ACCESS LEVEL ID  are required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userService.revokeUserAccessLevel(userId, accessLevelId);
  }
  @HasAccess('ADMIN')
  @UseGuards(JwtGuard, AccessLevelGuard)
  @Patch('issueAccessLevel') //issue access
  async issueAccessLevel(
    @Query('userId') userId: string,
    @Query('accessLevelId') accessLevelId: string,
  ) {
    if (!userId?.trim() || !accessLevelId?.trim()) {
      throw new HttpException(
        'USER ID and ACCESS LEVEL ID  are required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userService.updateUserAccessLevel(userId, accessLevelId);
  }
  @HasAccess('ADMIN')
  @UseGuards(JwtGuard, AccessLevelGuard)
  @Delete('delete')
  async deleteUser(@Query('userId') userId: string) {
    if (!userId?.trim()) {
      throw new HttpException(
        'USER ID is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.deleteUserById(userId);
  }
}
