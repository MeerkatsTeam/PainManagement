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
  Doctor,
} from '../models';
import {PatientRepository} from '../repositories';

export class PatientDoctorController {
  constructor(
    @repository(PatientRepository)
    public patientRepository: PatientRepository,
  ) { }

  @get('/patients/{id}/doctor', {
    responses: {
      '200': {
        description: 'Doctor belonging to Patient',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Doctor)},
          },
        },
      },
    },
  })
  async getDoctor(
    @param.path.string('id') id: typeof Patient.prototype.id,
  ): Promise<Doctor> {
    return this.patientRepository.doctor(id);
  }
}
