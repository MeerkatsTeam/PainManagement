import {Entity, model, property, hasMany} from '@loopback/repository';
import {Patient} from './patient.model';

@model()
export class Doctor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  citizenid: string;

  @property({
    type: 'number',
    required: true,
  })
  rethus: number;

  @property({
    type: 'string',
    required: true,
  })
  drugapplied: string;

  @property({
    type: 'string',
    required: true,
  })
  speciality: string;

  @hasMany(() => Patient)
  patients: Patient[];

  constructor(data?: Partial<Doctor>) {
    super(data);
  }
}

export interface DoctorRelations {
  // describe navigational properties here
}

export type DoctorWithRelations = Doctor & DoctorRelations;
