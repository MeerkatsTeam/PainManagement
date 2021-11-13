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
import {PainValoration} from '../models';
import {PainValorationRepository} from '../repositories';

export class PainValorationController {
  constructor(
    @repository(PainValorationRepository)
    public painValorationRepository : PainValorationRepository,
  ) {}

  @post('/pain-valorations')
  @response(200, {
    description: 'PainValoration model instance',
    content: {'application/json': {schema: getModelSchemaRef(PainValoration)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PainValoration, {
            title: 'NewPainValoration',
            exclude: ['id'],
          }),
        },
      },
    })
    painValoration: Omit<PainValoration, 'id'>,
  ): Promise<PainValoration> {
    return this.painValorationRepository.create(painValoration);
  }

  @get('/pain-valorations/count')
  @response(200, {
    description: 'PainValoration model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PainValoration) where?: Where<PainValoration>,
  ): Promise<Count> {
    return this.painValorationRepository.count(where);
  }

  @get('/pain-valorations')
  @response(200, {
    description: 'Array of PainValoration model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PainValoration, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PainValoration) filter?: Filter<PainValoration>,
  ): Promise<PainValoration[]> {
    return this.painValorationRepository.find(filter);
  }

  @patch('/pain-valorations')
  @response(200, {
    description: 'PainValoration PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PainValoration, {partial: true}),
        },
      },
    })
    painValoration: PainValoration,
    @param.where(PainValoration) where?: Where<PainValoration>,
  ): Promise<Count> {
    return this.painValorationRepository.updateAll(painValoration, where);
  }

  @get('/pain-valorations/{id}')
  @response(200, {
    description: 'PainValoration model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PainValoration, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PainValoration, {exclude: 'where'}) filter?: FilterExcludingWhere<PainValoration>
  ): Promise<PainValoration> {
    return this.painValorationRepository.findById(id, filter);
  }

  @patch('/pain-valorations/{id}')
  @response(204, {
    description: 'PainValoration PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PainValoration, {partial: true}),
        },
      },
    })
    painValoration: PainValoration,
  ): Promise<void> {
    await this.painValorationRepository.updateById(id, painValoration);
  }

  @put('/pain-valorations/{id}')
  @response(204, {
    description: 'PainValoration PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() painValoration: PainValoration,
  ): Promise<void> {
    await this.painValorationRepository.replaceById(id, painValoration);
  }

  @del('/pain-valorations/{id}')
  @response(204, {
    description: 'PainValoration DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.painValorationRepository.deleteById(id);
  }
}
