import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Patient} from './patient.model';

@model()
export class PainValoration extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'object',
    required: true,
  })
  PainType: object;

  @property({
    type: 'number',
    required: true,
  })
  PainScale: number;

  @property({
    type: 'date',
    required: true,
  })
  DateTimeReg: string;

  @property({
    type: 'boolean',
    required: true,
  })
  ApplicationOfDrugs: boolean;

  @belongsTo(() => Patient)
  patientId: string;

  constructor(data?: Partial<PainValoration>) {
    super(data);
  }
}

export interface PainValorationRelations {
  // describe navigational properties here
}

export type PainValorationWithRelations = PainValoration & PainValorationRelations;
