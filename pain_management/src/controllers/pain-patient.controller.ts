import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pain,
  Patient,
} from '../models';
import {PainRepository} from '../repositories';

export class PainPatientController {
  constructor(
    @repository(PainRepository)
    public painRepository: PainRepository,
  ) { }

  @get('/pains/{id}/patient', {
    responses: {
      '200': {
        description: 'Patient belonging to Pain',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Patient)},
          },
        },
      },
    },
  })
  async getPatient(
    @param.path.string('id') id: typeof Pain.prototype.id,
  ): Promise<Patient> {
    return this.painRepository.patient(id);
  }
}
