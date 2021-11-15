import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Triage} from './triage.model';
import {Doctor} from './doctor.model';
import {Pain} from './pain.model';

@model()
export class Patient extends Entity {
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
  citizenid: string;

  @property({
    type: 'date',
    required: true,
  })
  admission: string;

  @belongsTo(() => Triage)
  triageId: string;

  @belongsTo(() => Doctor)
  doctorId: string;

  @hasMany(() => Pain)
  y: Pain[];

  constructor(data?: Partial<Patient>) {
    super(data);
  }
}

export interface PatientRelations {
  // describe navigational properties here
}

export type PatientWithRelations = Patient & PatientRelations;
