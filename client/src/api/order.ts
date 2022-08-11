import { request } from '../util/request';

interface props {
  orders: ORDERFOOD[];
  payment: 'cash' | 'card';
}

export const postOrder = ({ orders, payment }: props) => {
  const foods = orders.map((order) => {
    return {
      id: order.id,
      name: order.name,
      unit: order.unit,
      options: {
        size: order.size,
        temperature: order.temperature,
      },
      eachPrice: order.eachPrice,
    };
  });
  return request({
    method: 'POST',
    url: 'order',
    body: { foods, payment, date: new Date().toString() },
  });
};
