import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pain, PainRelations, Patient} from '../models';
import {PatientRepository} from './patient.repository';

export class PainRepository extends DefaultCrudRepository<
  Pain,
  typeof Pain.prototype.id,
  PainRelations
> {

  public readonly patient: BelongsToAccessor<Patient, typeof Pain.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PatientRepository') protected patientRepositoryGetter: Getter<PatientRepository>,
  ) {
    super(Pain, dataSource);
    this.patient = this.createBelongsToAccessorFor('patient', patientRepositoryGetter,);
    this.registerInclusionResolver('patient', this.patient.inclusionResolver);
  }
}
