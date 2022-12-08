import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Casa>) {
    super(data);
  }
}

export interface CasaRelations {
  // describe navigational properties here
}

export type CasaWithRelations = Casa & CasaRelations;
