import React, { useState, createContext, Dispatch, SetStateAction } from 'react';

type Context<T> = {
  state: Array<T>;
  action: {
    setState: Dispatch<SetStateAction<Array<T>>>;
    addState: (arg: T) => void;
  };
};

const OrderContext = createContext<Context<ORDERFOOD> | null>(null);

const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, setOrder] = useState<ORDERFOOD[]>([]);

  const isEqual = (arg1: ORDERFOOD, arg2: ORDERFOOD): boolean => {
    if (arg1.id === arg2.id && JSON.stringify(arg1.options) === JSON.stringify(arg2.options))
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
    },
  };

  return <OrderContext.Provider value={context}>{children}</OrderContext.Provider>;
};

export { OrderProvider, OrderContext };
