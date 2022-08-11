import React, { useState, createContext, Dispatch, SetStateAction } from 'react';

type Context<T> = {
  state: Array<T>;
  action: {
    setState: Dispatch<SetStateAction<Array<T>>>;
    addState: (arg: T) => void;
    deleteState: (arg: T) => void;
    getTotalPrice: () => number;
    getTotalUnit: () => number;
  };
};

const OrderContext = createContext<Context<ORDERFOOD> | null>(null);

const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, setOrder] = useState<ORDERFOOD[]>([]);

  const isEqual = (arg1: ORDERFOOD, arg2: ORDERFOOD): boolean => {
    if (arg1.id === arg2.id && arg1.size === arg2.size && arg1.temperature === arg2.temperature)
      return true;
    return false;
  };

  const context = {
    state: order,
    action: {
      setState: setOrder,
      addState: (item: ORDERFOOD) => {
        setOrder((prev) => {
          const newItems = [...prev];
          let idx;

          for (let i = 0; i < newItems.length; i++) {
            if (isEqual(newItems[i], item)) {
              idx = i;
              break;
            }
          }

          if (idx !== undefined) newItems[idx].unit += item.unit;
          else newItems.push(item);

          return newItems;
        });
      },
      deleteState: (item: ORDERFOOD) => {
        setOrder((prev) => prev.filter((order) => !isEqual(order, item)));
      },
      getTotalPrice: () => {
        return order.reduce((total, { unit, eachPrice }) => total + unit * eachPrice, 0);
      },
      getTotalUnit: () => {
        return order.reduce((total, { unit }) => total + unit, 0);
      },
    },
  };

  return <OrderContext.Provider value={context}>{children}</OrderContext.Provider>;
};

export { OrderProvider, OrderContext };
