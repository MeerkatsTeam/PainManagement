import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbConnectDataSource} from '../datasources';
import {TriageOfficer, TriageOfficerRelations, Patient} from '../models';
import {PatientRepository} from './patient.repository';

export class TriageOfficerRepository extends DefaultCrudRepository<
  TriageOfficer,
  typeof TriageOfficer.prototype.id,
  TriageOfficerRelations
> {

  public readonly patients: HasManyRepositoryFactory<Patient, typeof TriageOfficer.prototype.id>;

  constructor(
    @inject('datasources.mongodb_connect') dataSource: MongodbConnectDataSource, @repository.getter('PatientRepository') protected patientRepositoryGetter: Getter<PatientRepository>,
  ) {
    super(TriageOfficer, dataSource);
    this.patients = this.createHasManyRepositoryFactoryFor('patients', patientRepositoryGetter,);
    this.registerInclusionResolver('patients', this.patients.inclusionResolver);
  }
}
