import { date } from 'src/types';

export const getToday = (): date => {
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };
};

export const getWeekAgo = (baseDate: date): date => {
  const date = new Date(baseDate.year, baseDate.month - 1, baseDate.date - 7);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };
};

export const convertDateStringToClass = (dateStr: Date | string): date => {
  const date = new Date(dateStr);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };
};
