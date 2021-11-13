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
  TriageOfficer,
  Patient,
} from '../models';
import {TriageOfficerRepository} from '../repositories';

export class TriageOfficerPatientController {
  constructor(
    @repository(TriageOfficerRepository) protected triageOfficerRepository: TriageOfficerRepository,
  ) { }

  @get('/triage-officers/{id}/patients', {
    responses: {
      '200': {
        description: 'Array of TriageOfficer has many Patient',
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
    return this.triageOfficerRepository.patients(id).find(filter);
  }

  @post('/triage-officers/{id}/patients', {
    responses: {
      '200': {
        description: 'TriageOfficer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Patient)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TriageOfficer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Patient, {
            title: 'NewPatientInTriageOfficer',
            exclude: ['id'],
            optional: ['triageOfficerId']
          }),
        },
      },
    }) patient: Omit<Patient, 'id'>,
  ): Promise<Patient> {
    return this.triageOfficerRepository.patients(id).create(patient);
  }

  @patch('/triage-officers/{id}/patients', {
    responses: {
      '200': {
        description: 'TriageOfficer.Patient PATCH success count',
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
    return this.triageOfficerRepository.patients(id).patch(patient, where);
  }

  @del('/triage-officers/{id}/patients', {
    responses: {
      '200': {
        description: 'TriageOfficer.Patient DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Patient)) where?: Where<Patient>,
  ): Promise<Count> {
    return this.triageOfficerRepository.patients(id).delete(where);
  }
}
