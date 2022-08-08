import { request } from '../util/request';

export const getOption = (): Promise<RESPONSE<OPTION>> => {
  return request({ method: 'GET', url: 'options' });
};
