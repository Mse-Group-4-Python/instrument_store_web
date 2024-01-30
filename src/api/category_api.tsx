import { Entity, createResource } from '@rest-hooks/rest';

export class CategoryModel extends Entity {
  category_id = 0;
  category_name = '';

  pk() {
    return `${this.category_id}`;
  }
  static key = 'CategoryModel';
}

export const CategoryResource = createResource({
  urlPrefix: 'http://127.0.0.1:5000',
  path: '/categories/:id',
  schema: CategoryModel,
});
