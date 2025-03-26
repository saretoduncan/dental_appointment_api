import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccessLevelService } from 'src/access_level/access_level.service';
import { UsersDtoReq } from 'src/dto/users.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly accessLevelService: AccessLevelService,
  ) {}

  async createUser(
    first_name: string,
    last_name: string,
    password: string,
    confirm: string,

    phone_number: string,
    email: string,
    work_email: string,
    national_id_no: string,
    role: string,
    keen_first_name: string,
    keen_last_name: string,
    keen_phone_number: string,
    keen_relationship: string,
    middle_name?: string,
    keen_email_address?: string,
  ) {
    const access_level = this.accessLevelService.findAccessLevelByLevel('USER');
    const user = await this.prismaService.user.findUnique({
      where: {
        user_name: national_id_no,
      },
    });
    if (user) {
      throw new HttpException(
        'User is alright registered',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prismaService.user.create({
      data: {
        user_name: national_id_no,
        password: hashPassword,
      },
    });
    const userProfile = await this.prismaService.userProfile.create({
      data: {
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
        work_email: work_email,
        national_id_no: national_id_no,
        role: role,
        user_id: newUser.id,
      },
    });
    const next_of_keen = await this.prismaService.nextOfKeen.create({
      data: {
        first_name: keen_first_name,
        last_Name: keen_last_name,
        phoneNumber: phone_number,
        email: keen_email_address,
        relationship: keen_relationship,
        profile_id: userProfile.id,
      },
    });

    return await this.prismaService.user.findUnique({
      where: { id: newUser.id },
      include: {
        profile: {
          include: {
            next_of_keen: true,
          },
        },
      },
    });
  }
}
