import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Patient, PatientRelations, Triage, Doctor, Pain} from '../models';
import {TriageRepository} from './triage.repository';
import {DoctorRepository} from './doctor.repository';
import {PainRepository} from './pain.repository';

export class PatientRepository extends DefaultCrudRepository<
  Patient,
  typeof Patient.prototype.id,
  PatientRelations
> {

  public readonly triage: BelongsToAccessor<Triage, typeof Patient.prototype.id>;

  public readonly doctor: BelongsToAccessor<Doctor, typeof Patient.prototype.id>;

  public readonly y: HasManyRepositoryFactory<Pain, typeof Patient.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TriageRepository') protected triageRepositoryGetter: Getter<TriageRepository>, @repository.getter('DoctorRepository') protected doctorRepositoryGetter: Getter<DoctorRepository>, @repository.getter('PainRepository') protected painRepositoryGetter: Getter<PainRepository>,
  ) {
    super(Patient, dataSource);
    this.y = this.createHasManyRepositoryFactoryFor('y', painRepositoryGetter,);
    this.registerInclusionResolver('y', this.y.inclusionResolver);
    this.doctor = this.createBelongsToAccessorFor('doctor', doctorRepositoryGetter,);
    this.registerInclusionResolver('doctor', this.doctor.inclusionResolver);
    this.triage = this.createBelongsToAccessorFor('triage', triageRepositoryGetter,);
    this.registerInclusionResolver('triage', this.triage.inclusionResolver);
  }
}
