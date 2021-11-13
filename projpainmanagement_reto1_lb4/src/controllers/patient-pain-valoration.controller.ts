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
  Patient,
  PainValoration,
} from '../models';
import {PatientRepository} from '../repositories';

export class PatientPainValorationController {
  constructor(
    @repository(PatientRepository) protected patientRepository: PatientRepository,
  ) { }

  @get('/patients/{id}/pain-valorations', {
    responses: {
      '200': {
        description: 'Array of Patient has many PainValoration',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PainValoration)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PainValoration>,
  ): Promise<PainValoration[]> {
    return this.patientRepository.painValorations(id).find(filter);
  }

  @post('/patients/{id}/pain-valorations', {
    responses: {
      '200': {
        description: 'Patient model instance',
        content: {'application/json': {schema: getModelSchemaRef(PainValoration)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Patient.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PainValoration, {
            title: 'NewPainValorationInPatient',
            exclude: ['id'],
            optional: ['patientId']
          }),
        },
      },
    }) painValoration: Omit<PainValoration, 'id'>,
  ): Promise<PainValoration> {
    return this.patientRepository.painValorations(id).create(painValoration);
  }

  @patch('/patients/{id}/pain-valorations', {
    responses: {
      '200': {
        description: 'Patient.PainValoration PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PainValoration, {partial: true}),
        },
      },
    })
    painValoration: Partial<PainValoration>,
    @param.query.object('where', getWhereSchemaFor(PainValoration)) where?: Where<PainValoration>,
  ): Promise<Count> {
    return this.patientRepository.painValorations(id).patch(painValoration, where);
  }

  @del('/patients/{id}/pain-valorations', {
    responses: {
      '200': {
        description: 'Patient.PainValoration DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PainValoration)) where?: Where<PainValoration>,
  ): Promise<Count> {
    return this.patientRepository.painValorations(id).delete(where);
  }
}
