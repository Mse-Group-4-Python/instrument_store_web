import { Entity, createResource } from '@rest-hooks/rest';

import { Guid } from 'guid-typescript';

export class InstrumentOrder extends Entity {
    instrument_name = '';
    quantity = 0;
    price = 0;
  
    pk() {
        return Guid.create().toString();
      }
    static key = 'InstrumentOrder';
  }

export class OrderModel extends Entity {
    id = 0;
    customer_name = '';
    delivery_address = '';
    phone_number = '';
    order_time = '';
    total_price = 0;
    order_items = [];

  pk() {
    return `${this.id}`;
  }
  static key = 'OrderModel';
}

export const OrderResource = createResource({
  urlPrefix: 'http://127.0.0.1:5000',
  path: '/customer-orders/:id',
  schema: OrderModel,
});
