import { Entity, createResource } from '@rest-hooks/rest';

export class InstrumentModel extends Entity {
  id = 0;
  instrument_name = '';
  manufacturer_id = 0;
  category_id = 0;
  description = '';
  color = '';
  tags = [''];

  pk() {
    return `${this.id}`;
  }
  static key = 'Instrument';
}

export const InstrumentResource = createResource({
  urlPrefix: 'http://127.0.0.1:5000',
  path: '/instruments/:id',
  schema: InstrumentModel,
});
