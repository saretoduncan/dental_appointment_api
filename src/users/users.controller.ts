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
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProfileDto, UsersDtoReq } from 'src/dto/users.dto';

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
      userInfo.role,
      userInfo.keen_first_name,
      userInfo.keen_last_name,
      userInfo.keen_phone_number,
      userInfo.keen_relationship,
      userInfo.middle_name,
      userInfo.keen_email_address,
    );
  }
  @Get('all') //get all users
  async getAllUsers() {
    return await this.userService.getAllUser();
  }

  @Get(':userId') //get user by id
  async getUserById(@Param('userId') userId: string) {
    if (!userId?.trim()) {
      throw new HttpException(
        'USER ID is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.getUserById(userId);
  }
  @Put('updateUserProfile/:userId') //update user profile
  async updateUserProfile(
    @Param('userId') userId: string,
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

  @Patch('revokeAccessLevel/:userId') //revoke user
  async revokeAccessLevel(
    @Query('accessLevelId') accessLevelId: string,
    @Param('userId') userId: string,
  ) {
    if (!userId?.trim() || !accessLevelId?.trim()) {
      throw new HttpException(
        'USER ID and ACCESS LEVEL ID  are required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.revokeAccessLevel(accessLevelId, userId);
  }

  @Patch('issueAccessLevel/:userId') //issue access
  async issueAccessLevel(
    @Param('userId') userId: string,
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

  @Delete('/delete/:userId')
  async deleteUser(@Param('userId') userId: string) {
    if (!userId?.trim()) {
      throw new HttpException(
        'USER ID is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.deleteUserById(userId);
  }
}
