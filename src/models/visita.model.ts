import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Casa} from './casa.model';
import {Visitante} from './visitante.model';

@model()
export class Visita extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  fechaEntrada?: string;

  @property({
    type: 'string',
  })
  fechaSalida?: string;

  @property({
    type: 'string',
  })
  visitanteId?: string;
  @property({
    type: 'string',
  })
  codigoQR?: string;

  @property({
    type: 'boolean',
  })
  estado?: boolean;

  @belongsTo(() => Casa)
  casaId: string;

  @hasMany(() => Visitante)
  visitantes: Visitante[];

  constructor(data?: Partial<Visita>) {
    super(data);
  }
}

export interface VisitaRelations {
  // describe navigational properties here
}

export type VisitaWithRelations = Visita & VisitaRelations;
