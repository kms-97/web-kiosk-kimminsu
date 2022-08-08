import { request } from '../util/request';

export const getFood = (categoryId?: number): Promise<RESPONSE<FOOD[]>> => {
  const method = 'GET';
  const url = 'foods';
  if (categoryId)
    return request({ method, url, query: [{ key: 'category-id', value: categoryId }] });
  else return request({ method, url });
};
