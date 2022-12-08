import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Visita} from './visita.model';

@model()
export class Visitante extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  identificacion?: number;

  @property({
    type: 'string',
  })
  nombre?: string;

  @property({
    type: 'boolean',
  })
  sexo?: boolean;

  @property({
    type: 'number',
  })
  edad?: number;

  @belongsTo(() => Visita)
  visitaId: string;

  constructor(data?: Partial<Visitante>) {
    super(data);
  }
}

export interface VisitanteRelations {
  // describe navigational properties here
}

export type VisitanteWithRelations = Visitante & VisitanteRelations;
