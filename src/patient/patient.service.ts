import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { error } from 'console';
import { create } from 'domain';
import {
  CreateDependentPatientDto,
  CreatePatientDto,
  UpdateDependentPatientDto,
  UpdatePatientDto,
} from 'src/dto/patients.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PatientService {
  constructor(private readonly prismaService: PrismaService) {}
  async addNewPatient(createPatientDto: CreatePatientDto) {
    const patient = await this.prismaService.patient.findFirst({
      where: {
        OR: [
          {
            national_id_no: createPatientDto.national_id_no,
          },
          {
            phone_number: createPatientDto.phone_number,
          },
        ],
      },
    });
    if (patient) {
      if (patient.national_id_no === patient.national_id_no) {
        throw new HttpException(
          'Provide phone number is already registered to another user',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'provide NATIONAL ID NUMBER is registered to another user',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const newPatient = await this.prismaService.patient.create({
        data: {
          first_name: createPatientDto.first_name,
          middle_name: createPatientDto.middle_name,
          last_name: createPatientDto.last_name,
          national_id_no: createPatientDto.national_id_no,
          phone_number: createPatientDto.phone_number,
          email: createPatientDto.email,
          residence: createPatientDto.residence,
          date_of_birth: new Date(createPatientDto.date_of_birth),
        },
      });
      return newPatient;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'There is a problem while saving patients data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async addDependent(
    patientId: string,
    dependentInfo: CreateDependentPatientDto,
  ) {
    const primaryCaregiver = await this.prismaService.patient.findUnique({
      where: {
        id: patientId,
      },
    });
    if (!primaryCaregiver) {
      throw new HttpException(
        'The primary caregiver/guardian is not registered with us',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.prismaService.dependentPatient.create({
      data: {
        first_name: dependentInfo.first_name,
        middle_name: dependentInfo.middle_name,
        last_name: dependentInfo.last_name,
        date_of_birth: dependentInfo.date_of_birth,
        phone_number: dependentInfo.phone_number,
        email: dependentInfo.email,
        dependent_relationship: dependentInfo.dependent_relationship,
        primary_care_giver: {
          connect: { id: primaryCaregiver.id },
        },
      },
      include: {
        primary_care_giver: true,
      },
    });
  }
  async getAllPatients() {
    return await this.prismaService.patient.findMany({
      include: {
        dependants: true,
      },
    });
  }
  async getPatientById(patientId: string) {
    const patient = await this.prismaService.patient.findUnique({
      where: {
        id: patientId,
      },
    });
    if (!patient) {
      throw new HttpException(
        'patient is not registered with us',
        HttpStatus.NOT_FOUND,
      );
    }
    return patient;
  }

  async getDependentPatientById(dependentId: string) {
    const dependentPatient =
      await this.prismaService.dependentPatient.findUnique({
        where: {
          id: dependentId,
        },
        include: {
          primary_care_giver: true,
          appointments: true,
        },
      });
    if (!dependentPatient) {
      throw new HttpException(
        'patient not register with us',
        HttpStatus.NOT_FOUND,
      );
    }
    return dependentPatient;
  }
  async updateDependentPatient(
    dependentId: string,
    dependentInfo: UpdateDependentPatientDto,
  ) {
    const dependent = await this.getDependentPatientById(dependentId);
    return await this.prismaService.dependentPatient.update({
      where: {
        id: dependent.id,
      },
      data: dependentInfo,
    });
  }
  async updatePatient(patientId: string, patientUpdateInfo: UpdatePatientDto) {
    const patient = await this.getPatientById(patientId);
    return await this.prismaService.patient.update({
      where: {
        id: patient.id,
      },
      data: patientUpdateInfo,
    });
  }
}
