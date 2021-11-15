import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Triage,
  Patient,
} from '../models';
import {TriageRepository} from '../repositories';

export class TriagePatientController {
  constructor(
    @repository(TriageRepository) protected triageRepository: TriageRepository,
  ) { }

  @get('/triages/{id}/patients', {
    responses: {
      '200': {
        description: 'Array of Triage has many Patient',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Patient)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Patient>,
  ): Promise<Patient[]> {
    return this.triageRepository.patients(id).find(filter);
  }

  @post('/triages/{id}/patients', {
    responses: {
      '200': {
        description: 'Triage model instance',
        content: {'application/json': {schema: getModelSchemaRef(Patient)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Triage.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Patient, {
            title: 'NewPatientInTriage',
            exclude: ['id'],
            optional: ['triageId']
          }),
        },
      },
    }) patient: Omit<Patient, 'id'>,
  ): Promise<Patient> {
    return this.triageRepository.patients(id).create(patient);
  }

  @patch('/triages/{id}/patients', {
    responses: {
      '200': {
        description: 'Triage.Patient PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Patient, {partial: true}),
        },
      },
    })
    patient: Partial<Patient>,
    @param.query.object('where', getWhereSchemaFor(Patient)) where?: Where<Patient>,
  ): Promise<Count> {
    return this.triageRepository.patients(id).patch(patient, where);
  }

  @del('/triages/{id}/patients', {
    responses: {
      '200': {
        description: 'Triage.Patient DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Patient)) where?: Where<Patient>,
  ): Promise<Count> {
    return this.triageRepository.patients(id).delete(where);
  }
}
