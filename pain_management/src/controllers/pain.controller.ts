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
import {Pain} from '../models';
import {PainRepository} from '../repositories';

export class PainController {
  constructor(
    @repository(PainRepository)
    public painRepository : PainRepository,
  ) {}

  @post('/pains')
  @response(200, {
    description: 'Pain model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pain)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pain, {
            title: 'NewPain',
            exclude: ['id'],
          }),
        },
      },
    })
    pain: Omit<Pain, 'id'>,
  ): Promise<Pain> {
    return this.painRepository.create(pain);
  }

  @get('/pains/count')
  @response(200, {
    description: 'Pain model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pain) where?: Where<Pain>,
  ): Promise<Count> {
    return this.painRepository.count(where);
  }

  @get('/pains')
  @response(200, {
    description: 'Array of Pain model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pain, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pain) filter?: Filter<Pain>,
  ): Promise<Pain[]> {
    return this.painRepository.find(filter);
  }

  @patch('/pains')
  @response(200, {
    description: 'Pain PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pain, {partial: true}),
        },
      },
    })
    pain: Pain,
    @param.where(Pain) where?: Where<Pain>,
  ): Promise<Count> {
    return this.painRepository.updateAll(pain, where);
  }

  @get('/pains/{id}')
  @response(200, {
    description: 'Pain model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pain, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pain, {exclude: 'where'}) filter?: FilterExcludingWhere<Pain>
  ): Promise<Pain> {
    return this.painRepository.findById(id, filter);
  }

  @patch('/pains/{id}')
  @response(204, {
    description: 'Pain PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pain, {partial: true}),
        },
      },
    })
    pain: Pain,
  ): Promise<void> {
    await this.painRepository.updateById(id, pain);
  }

  @put('/pains/{id}')
  @response(204, {
    description: 'Pain PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pain: Pain,
  ): Promise<void> {
    await this.painRepository.replaceById(id, pain);
  }

  @del('/pains/{id}')
  @response(204, {
    description: 'Pain DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.painRepository.deleteById(id);
  }
}
