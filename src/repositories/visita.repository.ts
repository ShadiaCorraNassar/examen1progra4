import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Visita, VisitaRelations, Casa, Visitante} from '../models';
import {CasaRepository} from './casa.repository';
import {VisitanteRepository} from './visitante.repository';

export class VisitaRepository extends DefaultCrudRepository<
  Visita,
  typeof Visita.prototype.id,
  VisitaRelations
> {

  public readonly casa: BelongsToAccessor<Casa, typeof Visita.prototype.id>;

  public readonly visitantes: HasManyRepositoryFactory<Visitante, typeof Visita.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('CasaRepository') protected casaRepositoryGetter: Getter<CasaRepository>, @repository.getter('VisitanteRepository') protected visitanteRepositoryGetter: Getter<VisitanteRepository>,
  ) {
    super(Visita, dataSource);
    this.visitantes = this.createHasManyRepositoryFactoryFor('visitantes', visitanteRepositoryGetter,);
    this.registerInclusionResolver('visitantes', this.visitantes.inclusionResolver);
    this.casa = this.createBelongsToAccessorFor('casa', casaRepositoryGetter,);
    this.registerInclusionResolver('casa', this.casa.inclusionResolver);
  }
}
