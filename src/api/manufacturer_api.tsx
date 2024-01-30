import { Entity, createResource } from '@rest-hooks/rest';

export class ManufacturersModel extends Entity {
  manufacturer_id = 0;
  manufacturer_name = '';

  pk() {
    return `${this.manufacturer_id}`;
  }
  static key = 'ManufacturersModel';
}

export const ManufacturersResource = createResource({
  urlPrefix: 'http://127.0.0.1:5000',
  path: '/manufacturers/:id',
  schema: ManufacturersModel,
});
