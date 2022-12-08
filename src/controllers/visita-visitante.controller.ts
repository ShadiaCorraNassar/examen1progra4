import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Visita,
  Visitante,
} from '../models';
import {VisitaRepository} from '../repositories';

export class VisitaVisitanteController {
  constructor(
    @repository(VisitaRepository) protected visitaRepository: VisitaRepository,
  ) { }

  @get('/visitas/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Array of Visita has many Visitante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visitante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Visitante>,
  ): Promise<Visitante[]> {
    return this.visitaRepository.visitantes(id).find(filter);
  }

  @post('/visitas/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Visita model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visitante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Visita.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitante, {
            title: 'NewVisitanteInVisita',
            exclude: ['id'],
            optional: ['visitaId']
          }),
        },
      },
    }) visitante: Omit<Visitante, 'id'>,
  ): Promise<Visitante> {
    return this.visitaRepository.visitantes(id).create(visitante);
  }

  @patch('/visitas/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Visita.Visitante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitante, {partial: true}),
        },
      },
    })
    visitante: Partial<Visitante>,
    @param.query.object('where', getWhereSchemaFor(Visitante)) where?: Where<Visitante>,
  ): Promise<Count> {
    return this.visitaRepository.visitantes(id).patch(visitante, where);
  }

  @del('/visitas/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Visita.Visitante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Visitante)) where?: Where<Visitante>,
  ): Promise<Count> {
    return this.visitaRepository.visitantes(id).delete(where);
  }
}
