import { Entity, createResource } from '@rest-hooks/rest';

export class InstrumentItems extends Entity {
  id = 0;
  instrument_id = 0;
  description = '';
  price = 0;
  serial_number = '';
  year_of_purchase = 0;

  pk() {
    return `${this.id}`;
  }
  static key = 'InstrumentItem';
}

export const InstrumentItemResource = createResource({
  urlPrefix: 'http://127.0.0.1:5000',
  path: '/instrument-items/:id',
  schema: InstrumentItems,
});
