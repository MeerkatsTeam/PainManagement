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
  TriageOfficer,
} from '../models';
import {PatientRepository} from '../repositories';

export class PatientTriageOfficerController {
  constructor(
    @repository(PatientRepository)
    public patientRepository: PatientRepository,
  ) { }

  @get('/patients/{id}/triage-officer', {
    responses: {
      '200': {
        description: 'TriageOfficer belonging to Patient',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TriageOfficer)},
          },
        },
      },
    },
  })
  async getTriageOfficer(
    @param.path.string('id') id: typeof Patient.prototype.id,
  ): Promise<TriageOfficer> {
    return this.patientRepository.triageOfficer(id);
  }
}
