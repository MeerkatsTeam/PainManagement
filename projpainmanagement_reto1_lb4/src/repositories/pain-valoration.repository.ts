import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbConnectDataSource} from '../datasources';
import {PainValoration, PainValorationRelations, Patient} from '../models';
import {PatientRepository} from './patient.repository';

export class PainValorationRepository extends DefaultCrudRepository<
  PainValoration,
  typeof PainValoration.prototype.id,
  PainValorationRelations
> {

  public readonly patient: BelongsToAccessor<Patient, typeof PainValoration.prototype.id>;

  constructor(
    @inject('datasources.mongodb_connect') dataSource: MongodbConnectDataSource, @repository.getter('PatientRepository') protected patientRepositoryGetter: Getter<PatientRepository>,
  ) {
    super(PainValoration, dataSource);
    this.patient = this.createBelongsToAccessorFor('patient', patientRepositoryGetter,);
    this.registerInclusionResolver('patient', this.patient.inclusionResolver);
  }
}
