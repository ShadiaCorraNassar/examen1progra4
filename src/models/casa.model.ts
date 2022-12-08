import {Entity, model, property, hasMany} from '@loopback/repository';
import {Visita} from './visita.model';
import {HabitantesCasa} from './habitantes-casa.model';

@model()
export class Casa extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  numero?: number;

  @property({
    type: 'number',
  })
  bloque?: number;

  @property({
    type: 'number',
  })
  calle?: number;

  @property({
    type: 'string',
  })
  referencia?: string;

  @hasMany(() => Visita)
  visitas: Visita[];

  @hasMany(() => HabitantesCasa)
  habitantesCasas: HabitantesCasa[];

  constructor(data?: Partial<Casa>) {
    super(data);
  }
}

export interface CasaRelations {
  // describe navigational properties here
}

export type CasaWithRelations = Casa & CasaRelations;
