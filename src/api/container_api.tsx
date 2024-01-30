import { Entity, createResource } from '@rest-hooks/rest';

export class Todo extends Entity {
  id = 0;
  title = '';
  description = '';
  done = false;

  pk() {
    return `${this.id}`;
  }
  static key = 'Todo';
}

export const TodoResource = createResource({
  urlPrefix: 'http://127.0.0.1:5000',
  path: '/tasks/:id',
  schema: Todo,
});