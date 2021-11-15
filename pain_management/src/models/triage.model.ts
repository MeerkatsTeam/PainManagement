import {Entity, model, property, hasMany} from '@loopback/repository';
import {Patient} from './patient.model';

@model()
export class Triage extends Entity {
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
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => Patient)
  patients: Patient[];

  constructor(data?: Partial<Triage>) {
    super(data);
  }
}

export interface TriageRelations {
  // describe navigational properties here
}

export type TriageWithRelations = Triage & TriageRelations;
