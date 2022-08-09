import { request } from '../util/request';

export const getCategory = (): Promise<RESPONSE<CATEGORY[]>> => {
  return request({ method: 'GET', url: 'categories' });
};
