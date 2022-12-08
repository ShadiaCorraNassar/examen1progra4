import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Visitante,
  Visita,
} from '../models';
import {VisitanteRepository} from '../repositories';

export class VisitanteVisitaController {
  constructor(
    @repository(VisitanteRepository)
    public visitanteRepository: VisitanteRepository,
  ) { }

  @get('/visitantes/{id}/visita', {
    responses: {
      '200': {
        description: 'Visita belonging to Visitante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visita)},
          },
        },
      },
    },
  })
  async getVisita(
    @param.path.string('id') id: typeof Visitante.prototype.id,
  ): Promise<Visita> {
    return this.visitanteRepository.visita(id);
  }
}
