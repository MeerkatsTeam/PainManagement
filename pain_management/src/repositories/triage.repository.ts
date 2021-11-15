import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Triage, TriageRelations, Patient} from '../models';
import {PatientRepository} from './patient.repository';

export class TriageRepository extends DefaultCrudRepository<
  Triage,
  typeof Triage.prototype.id,
  TriageRelations
> {

  public readonly patients: HasManyRepositoryFactory<Patient, typeof Triage.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PatientRepository') protected patientRepositoryGetter: Getter<PatientRepository>,
  ) {
    super(Triage, dataSource);
    this.patients = this.createHasManyRepositoryFactoryFor('patients', patientRepositoryGetter,);
    this.registerInclusionResolver('patients', this.patients.inclusionResolver);
  }
}
