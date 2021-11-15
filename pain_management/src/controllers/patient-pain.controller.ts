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
  Pain,
} from '../models';
import {PatientRepository} from '../repositories';

export class PatientPainController {
  constructor(
    @repository(PatientRepository) protected patientRepository: PatientRepository,
  ) { }

  @get('/patients/{id}/pains', {
    responses: {
      '200': {
        description: 'Array of Patient has many Pain',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pain)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pain>,
  ): Promise<Pain[]> {
    return this.patientRepository.y(id).find(filter);
  }

  @post('/patients/{id}/pains', {
    responses: {
      '200': {
        description: 'Patient model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pain)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Patient.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pain, {
            title: 'NewPainInPatient',
            exclude: ['id'],
            optional: ['patientId']
          }),
        },
      },
    }) pain: Omit<Pain, 'id'>,
  ): Promise<Pain> {
    return this.patientRepository.y(id).create(pain);
  }

  @patch('/patients/{id}/pains', {
    responses: {
      '200': {
        description: 'Patient.Pain PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pain, {partial: true}),
        },
      },
    })
    pain: Partial<Pain>,
    @param.query.object('where', getWhereSchemaFor(Pain)) where?: Where<Pain>,
  ): Promise<Count> {
    return this.patientRepository.y(id).patch(pain, where);
  }

  @del('/patients/{id}/pains', {
    responses: {
      '200': {
        description: 'Patient.Pain DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pain)) where?: Where<Pain>,
  ): Promise<Count> {
    return this.patientRepository.y(id).delete(where);
  }
}
