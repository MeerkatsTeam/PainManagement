import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Patient,
  Triage,
} from '../models';
import {PatientRepository} from '../repositories';

export class PatientTriageController {
  constructor(
    @repository(PatientRepository)
    public patientRepository: PatientRepository,
  ) { }

  @get('/patients/{id}/triage', {
    responses: {
      '200': {
        description: 'Triage belonging to Patient',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Triage)},
          },
        },
      },
    },
  })
  async getTriage(
    @param.path.string('id') id: typeof Patient.prototype.id,
  ): Promise<Triage> {
    return this.patientRepository.triage(id);
  }
}
