import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbConnectDataSource} from '../datasources';
import {Patient, PatientRelations, TriageOfficer, PainValoration, Doctor} from '../models';
import {TriageOfficerRepository} from './triage-officer.repository';
import {PainValorationRepository} from './pain-valoration.repository';
import {DoctorRepository} from './doctor.repository';

export class PatientRepository extends DefaultCrudRepository<
  Patient,
  typeof Patient.prototype.id,
  PatientRelations
> {

  public readonly triageOfficer: BelongsToAccessor<TriageOfficer, typeof Patient.prototype.id>;

  public readonly painValorations: HasManyRepositoryFactory<PainValoration, typeof Patient.prototype.id>;

  public readonly doctor: BelongsToAccessor<Doctor, typeof Patient.prototype.id>;

  constructor(
    @inject('datasources.mongodb_connect') dataSource: MongodbConnectDataSource, @repository.getter('TriageOfficerRepository') protected triageOfficerRepositoryGetter: Getter<TriageOfficerRepository>, @repository.getter('PainValorationRepository') protected painValorationRepositoryGetter: Getter<PainValorationRepository>, @repository.getter('DoctorRepository') protected doctorRepositoryGetter: Getter<DoctorRepository>,
  ) {
    super(Patient, dataSource);
    this.doctor = this.createBelongsToAccessorFor('doctor', doctorRepositoryGetter,);
    this.registerInclusionResolver('doctor', this.doctor.inclusionResolver);
    this.painValorations = this.createHasManyRepositoryFactoryFor('painValorations', painValorationRepositoryGetter,);
    this.registerInclusionResolver('painValorations', this.painValorations.inclusionResolver);
    this.triageOfficer = this.createBelongsToAccessorFor('triageOfficer', triageOfficerRepositoryGetter,);
    this.registerInclusionResolver('triageOfficer', this.triageOfficer.inclusionResolver);
  }
}
