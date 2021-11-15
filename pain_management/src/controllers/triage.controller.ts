import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Triage} from '../models';
import {TriageRepository} from '../repositories';

export class TriageController {
  constructor(
    @repository(TriageRepository)
    public triageRepository : TriageRepository,
  ) {}

  @post('/triages')
  @response(200, {
    description: 'Triage model instance',
    content: {'application/json': {schema: getModelSchemaRef(Triage)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Triage, {
            title: 'NewTriage',
            exclude: ['id'],
          }),
        },
      },
    })
    triage: Omit<Triage, 'id'>,
  ): Promise<Triage> {
    return this.triageRepository.create(triage);
  }

  @get('/triages/count')
  @response(200, {
    description: 'Triage model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Triage) where?: Where<Triage>,
  ): Promise<Count> {
    return this.triageRepository.count(where);
  }

  @get('/triages')
  @response(200, {
    description: 'Array of Triage model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Triage, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Triage) filter?: Filter<Triage>,
  ): Promise<Triage[]> {
    return this.triageRepository.find(filter);
  }

  @patch('/triages')
  @response(200, {
    description: 'Triage PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Triage, {partial: true}),
        },
      },
    })
    triage: Triage,
    @param.where(Triage) where?: Where<Triage>,
  ): Promise<Count> {
    return this.triageRepository.updateAll(triage, where);
  }

  @get('/triages/{id}')
  @response(200, {
    description: 'Triage model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Triage, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Triage, {exclude: 'where'}) filter?: FilterExcludingWhere<Triage>
  ): Promise<Triage> {
    return this.triageRepository.findById(id, filter);
  }

  @patch('/triages/{id}')
  @response(204, {
    description: 'Triage PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Triage, {partial: true}),
        },
      },
    })
    triage: Triage,
  ): Promise<void> {
    await this.triageRepository.updateById(id, triage);
  }

  @put('/triages/{id}')
  @response(204, {
    description: 'Triage PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() triage: Triage,
  ): Promise<void> {
    await this.triageRepository.replaceById(id, triage);
  }

  @del('/triages/{id}')
  @response(204, {
    description: 'Triage DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.triageRepository.deleteById(id);
  }
}
