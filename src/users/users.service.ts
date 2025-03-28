import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccessLevelService } from 'src/access_level/access_level.service';
import { UserProfileDto, UsersDtoReq } from 'src/dto/users.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly accessLevelService: AccessLevelService,
  ) {}
  //create user
  async createUser(
    first_name: string,
    last_name: string,
    password: string,
    confirm_password: string,
    phone_number: string,
    email: string,
    work_email: string,
    national_id_no: string,
    job_title: string,
    keen_first_name: string,
    keen_last_name: string,
    keen_phone_number: string,
    keen_relationship: string,
    middle_name?: string,
    keen_email_address?: string,
  ) {
    if (password !== confirm_password)
      throw new HttpException(
        "The password doesn't match",
        HttpStatus.BAD_REQUEST,
      );
    const access_level =
      await this.accessLevelService.findAccessLevelByLevel('USER');
    const user = await this.prismaService.user.findUnique({
      where: {
        user_name: national_id_no,
      },
    });
    if (user) {
      throw new HttpException(
        'User is already registered',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prismaService.user.create({
      data: {
        user_name: national_id_no,
        password: hashPassword,
        profile: {
          create: {
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
            work_email: work_email,
            national_id_no: national_id_no,
            job_title: job_title,
            next_of_keen: {
              create: {
                first_name: keen_first_name,
                last_Name: keen_last_name,
                phoneNumber: keen_phone_number,
                email: keen_email_address,
                relationship: keen_relationship,
              },
            },
          },
        },
        access_levels: {
          connect: {
            id: access_level.id,
          },
        },
      },
      omit: {
        password: true,
      },
      include: {
        profile: {
          include: {
            next_of_keen: true,
          },
        },
        access_levels: true,
      },
    });

    return newUser;
  }
  //get all users
  async getAllUser() {
    const users = await this.prismaService.user.findMany({
      omit: {
        password: true,
      },
      include: {
        profile: {
          include: {
            next_of_keen: true,
          },
        },
        access_levels: true,
      },
    });
    return users;
  }
  //get user by id
  async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      include: {
        profile: {
          include: {
            next_of_keen: true,
          },
        },
        access_levels: true,
      },
      omit: {
        password: true,
      },
    });
    if (!user) {
      throw new HttpException(
        `We cannot find a user with this ${id} id`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
  //get user by national id
  getUserByNationalId(national_id: string) {
    const userProfile = this.prismaService.userProfile.findUnique({
      where: {
        national_id_no: national_id,
      },
      include: {
        user: {
          omit: {
            password: true,
          },
          include: {
            access_levels: true,
          },
        },
        next_of_keen: true,
      },
    });
    if (!userProfile)
      throw new HttpException(
        `user with ${national_id} cannot be found`,
        HttpStatus.NOT_FOUND,
      );
    return userProfile;
  }
  //update password
  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user)
      throw new HttpException(
        `The user with the id:${userId} is not registered yet`,
        HttpStatus.NOT_FOUND,
      );
    if (newPassword !== confirmPassword)
      throw new HttpException("passwords doen't", HttpStatus.BAD_REQUEST);
    const isCorrectPass = await bcrypt.compare(oldPassword, user.password);
    if (!isCorrectPass)
      throw new HttpException(
        'the old password is incorrect',
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = await bcrypt.hash(newPassword, 10);
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashPassword,
      },
      omit: {
        password: true,
      },
      include: {
        access_levels: true,
      },
    });
    return;
  }
  //update user profile
  async updateUserProfile(userId: string, profileInfo: UserProfileDto) {
    const saveProfile = await this.prismaService.userProfile.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!saveProfile)
      throw new HttpException(
        `The user with the id:${userId} has not created a profile yet`,
        HttpStatus.NOT_FOUND,
      );
    return await this.prismaService.userProfile.update({
      where: {
        user_id: saveProfile.user_id,
      },
      data: profileInfo,
      include: {
        user: {
          omit: {
            password: true,
          },
          include: {
            access_levels: true,
          },
        },
        next_of_keen: true,
      },
    });
  }
  //add accessLevel
  async updateUserAccessLevel(userId: string, accessLevelId: string) {
    const user = await this.getUserById(userId);
    const accLevel =
      await this.accessLevelService.getAccessLevelById(accessLevelId);
    return await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        access_levels: {
          connect: { id: accLevel.id },
        },
      },
      include: {
        profile: {
          include: {
            next_of_keen: true,
          },
        },
        access_levels: true,
      },
      omit: {
        password: true,
      },
    });
  }
  //revoke access level
  async revokeUserAccessLevel(userId: string, accessLevelId: string) {
    const user = await this.getUserById(userId);
    const accLevel =
      await this.accessLevelService.getAccessLevelById(accessLevelId);
    return await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        access_levels: {
          disconnect: {
            id: accLevel.id,
          },
        },
      },
      include: {
        profile: {
          include: {
            next_of_keen: true,
          },
        },
        access_levels:true
      },
      omit: {
        password: true,
      },
    });
  }
  //delete user
  async deleteUserById(userId: string) {
    //get user
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: {
          include: {
            next_of_keen: true,
          },
        },
      },
      omit:{
        password:true
      }
    });
    //check if user exists
    if (!user) {
      throw new HttpException(
        `user with the id:${userId} is not registered yet`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.profile) {
      if (user.profile.next_of_keen) {
        //delete next of keen
        await this.prismaService.nextOfKeen.delete({
          where: {
            id: user.profile.next_of_keen.id,
          },
        });
      }
      await this.prismaService.userProfile.delete({
        where: {
          id: user.profile.id,
        },
      });
    }
    //remove all access levels
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        access_levels: {
          set: [],
        },
      },
    });
    return await this.prismaService.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}
