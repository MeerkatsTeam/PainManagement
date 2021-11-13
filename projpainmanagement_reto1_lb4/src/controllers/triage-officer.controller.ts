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
import {TriageOfficer} from '../models';
import {TriageOfficerRepository} from '../repositories';

export class TriageOfficerController {
  constructor(
    @repository(TriageOfficerRepository)
    public triageOfficerRepository : TriageOfficerRepository,
  ) {}

  @post('/triage-officers')
  @response(200, {
    description: 'TriageOfficer model instance',
    content: {'application/json': {schema: getModelSchemaRef(TriageOfficer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TriageOfficer, {
            title: 'NewTriageOfficer',
            exclude: ['id'],
          }),
        },
      },
    })
    triageOfficer: Omit<TriageOfficer, 'id'>,
  ): Promise<TriageOfficer> {
    return this.triageOfficerRepository.create(triageOfficer);
  }

  @get('/triage-officers/count')
  @response(200, {
    description: 'TriageOfficer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TriageOfficer) where?: Where<TriageOfficer>,
  ): Promise<Count> {
    return this.triageOfficerRepository.count(where);
  }

  @get('/triage-officers')
  @response(200, {
    description: 'Array of TriageOfficer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TriageOfficer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TriageOfficer) filter?: Filter<TriageOfficer>,
  ): Promise<TriageOfficer[]> {
    return this.triageOfficerRepository.find(filter);
  }

  @patch('/triage-officers')
  @response(200, {
    description: 'TriageOfficer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TriageOfficer, {partial: true}),
        },
      },
    })
    triageOfficer: TriageOfficer,
    @param.where(TriageOfficer) where?: Where<TriageOfficer>,
  ): Promise<Count> {
    return this.triageOfficerRepository.updateAll(triageOfficer, where);
  }

  @get('/triage-officers/{id}')
  @response(200, {
    description: 'TriageOfficer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TriageOfficer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TriageOfficer, {exclude: 'where'}) filter?: FilterExcludingWhere<TriageOfficer>
  ): Promise<TriageOfficer> {
    return this.triageOfficerRepository.findById(id, filter);
  }

  @patch('/triage-officers/{id}')
  @response(204, {
    description: 'TriageOfficer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TriageOfficer, {partial: true}),
        },
      },
    })
    triageOfficer: TriageOfficer,
  ): Promise<void> {
    await this.triageOfficerRepository.updateById(id, triageOfficer);
  }

  @put('/triage-officers/{id}')
  @response(204, {
    description: 'TriageOfficer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() triageOfficer: TriageOfficer,
  ): Promise<void> {
    await this.triageOfficerRepository.replaceById(id, triageOfficer);
  }

  @del('/triage-officers/{id}')
  @response(204, {
    description: 'TriageOfficer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.triageOfficerRepository.deleteById(id);
  }
}
