import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {TriageOfficer} from './triage-officer.model';
import {PainValoration} from './pain-valoration.model';
import {Doctor} from './doctor.model';

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
  CitizenID: string;

  @property({
    type: 'date',
    required: true,
  })
  DateTimeAdmossion: string;

  @belongsTo(() => TriageOfficer)
  triageOfficerId: string;

  @hasMany(() => PainValoration)
  painValorations: PainValoration[];

  @belongsTo(() => Doctor)
  doctorId: string;

  constructor(data?: Partial<Patient>) {
    super(data);
  }
}

export interface PatientRelations {
  // describe navigational properties here
}

export type PatientWithRelations = Patient & PatientRelations;
