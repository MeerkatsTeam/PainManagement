import {Entity, model, property, hasMany} from '@loopback/repository';
import {Patient} from './patient.model';

@model()
export class TriageOfficer extends Entity {
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
  Username: string;

  @property({
    type: 'string',
    required: true,
  })
  Password: string;

  @hasMany(() => Patient)
  patients: Patient[];

  constructor(data?: Partial<TriageOfficer>) {
    super(data);
  }
}

export interface TriageOfficerRelations {
  // describe navigational properties here
}

export type TriageOfficerWithRelations = TriageOfficer & TriageOfficerRelations;
