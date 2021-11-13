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
    type: 'number',
    default: 222222222222,
  })
  CitizenID?: number;

  @property({
    type: 'number',
    required: true,
  })
  ReTHUS: number;

  @property({
    type: 'string',
    required: true,
  })
  DrugApplied: string;

  @property({
    type: 'string',
    required: true,
  })
  DoctorName: string;

  @property({
    type: 'string',
    required: true,
  })
  Specuality: string;

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
