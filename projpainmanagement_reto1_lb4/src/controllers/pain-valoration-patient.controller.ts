import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PainValoration,
  Patient,
} from '../models';
import {PainValorationRepository} from '../repositories';

export class PainValorationPatientController {
  constructor(
    @repository(PainValorationRepository)
    public painValorationRepository: PainValorationRepository,
  ) { }

  @get('/pain-valorations/{id}/patient', {
    responses: {
      '200': {
        description: 'Patient belonging to PainValoration',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Patient)},
          },
        },
      },
    },
  })
  async getPatient(
    @param.path.string('id') id: typeof PainValoration.prototype.id,
  ): Promise<Patient> {
    return this.painValorationRepository.patient(id);
  }
}
