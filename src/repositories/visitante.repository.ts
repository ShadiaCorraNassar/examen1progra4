import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Visitante, VisitanteRelations, Visita} from '../models';
import {VisitaRepository} from './visita.repository';

export class VisitanteRepository extends DefaultCrudRepository<
  Visitante,
  typeof Visitante.prototype.id,
  VisitanteRelations
> {

  public readonly visita: BelongsToAccessor<Visita, typeof Visitante.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('VisitaRepository') protected visitaRepositoryGetter: Getter<VisitaRepository>,
  ) {
    super(Visitante, dataSource);
    this.visita = this.createBelongsToAccessorFor('visita', visitaRepositoryGetter,);
    this.registerInclusionResolver('visita', this.visita.inclusionResolver);
  }
}
