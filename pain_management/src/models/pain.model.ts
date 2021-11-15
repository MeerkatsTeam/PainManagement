import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Patient} from './patient.model';

@model()
export class Pain extends Entity {
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
  type: object;

  @property({
    type: 'number',
    required: true,
  })
  scale: number;

  @property({
    type: 'date',
    required: true,
  })
  timereg: string;

  @property({
    type: 'boolean',
    required: true,
  })
  applicationdrugs: boolean;

  @belongsTo(() => Patient)
  patientId: string;

  constructor(data?: Partial<Pain>) {
    super(data);
  }
}

export interface PainRelations {
  // describe navigational properties here
}

export type PainWithRelations = Pain & PainRelations;
