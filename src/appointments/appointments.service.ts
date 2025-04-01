import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAppointments } from './appointments.interface';
import {
  CreateAppointmentsDto,
  ReturnAppointmentDto,
  UpdateAppointmentDto,
} from 'src/dto/appointments.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PatientService } from 'src/patient/patient.service';

@Injectable()
export class AppointmentsService implements IAppointments {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
    private readonly patientService: PatientService,
  ) {}

  async createAppointments(
    createAppoinment: CreateAppointmentsDto,
  ): Promise<ReturnAppointmentDto> {
    const user = await this.userService.getUserById(
      createAppoinment.booked_by_id,
    );
    if (
      !createAppoinment.patient_id &&
      !createAppoinment.dependent_patient_id
    ) {
      throw new HttpException(
        'PATIENT ID and DEPENDENT ID cannot be empty, atleast one is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (createAppoinment.patient_id) {
      const patient = await this.patientService.getPatientById(
        createAppoinment.patient_id,
      );
      const newPatient = await this.prismaService.appointment.create({
        data: {
          appointment: createAppoinment.appointment,
          treatement: createAppoinment.treatement,
          patient: {
            connect: {
              id: patient.id,
            },
          },
          booked_by: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return newPatient;
    } else {
      return await this.prismaService.appointment.create({
        data: {
          appointment: createAppoinment.appointment,
          treatement: createAppoinment.treatement,
          dependentPatient: {
            connect: {
              id: createAppoinment.dependent_patient_id,
            },
          },
          booked_by: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }
  }
  async getAllAppointments(): Promise<ReturnAppointmentDto[]> {
    return await this.prismaService.appointment.findMany({
      include: {
        patient: true,
        dependentPatient: true,
        booked_by: true,
      },
    });
  }
  async geAllAppointmentsByPatient(
    patient_id: string,
  ): Promise<ReturnAppointmentDto[]> {
    return await this.prismaService.appointment.findMany({
      where: {
        patient_id: patient_id,
      },
    });
  }
  async getAllAppointmentsByDependent(
    dependentId: string,
  ): Promise<ReturnAppointmentDto[]> {
    return await this.prismaService.appointment.findMany({
      where: {
        dependent_patient_id: dependentId,
      },
    });
  }
  async getAppointmentsById(id: string): Promise<ReturnAppointmentDto> {
    const getAppointment = await this.prismaService.appointment.findUnique({
      where: {
        id: id,
      },
    });
    if (!getAppointment) {
      throw new HttpException(
        'There is no appointment for with the APPOINTMENT ID provided',
        HttpStatus.NOT_FOUND,
      );
    }
    return getAppointment;
  }
  async updateAppointment(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<ReturnAppointmentDto> {
    const appointment = await this.prismaService.appointment.findUnique({
      where: {
        id: id,
      },
    });
    if (!appointment)
      throw new HttpException(
        'There is no appointment with the APPOINTMENT ID provided',
        HttpStatus.NOT_FOUND,
      );
    return await this.prismaService.appointment.update({
      where: {
        id: appointment.id,
      },
      data: updateAppointmentDto,
    });
  }
  async deleteAppoinment(id: string): Promise<void> {
    const appointment = await this.getAppointmentsById(id);
    if (appointment.dependent_patient_id) {
      await this.prismaService.appointment.update({
        where: {
          id: appointment.id,
        },
        data: {
          dependentPatient: {
            disconnect: {
              id: appointment.dependent_patient_id,
            },
          },
        },
      });
    }
    if (appointment.patient_id) {
      await this.prismaService.appointment.update({
        where: {
          id: appointment.id,
        },
        data: {
          patient: {
            disconnect: {
              id: appointment.patient_id,
            },
          },
        },
      });
    }

    await this.prismaService.appointment.delete({
      where: {
        id: appointment.id,
      },
    });

    return;
  }
}
