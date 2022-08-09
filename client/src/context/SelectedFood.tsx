import React, { useState, createContext, Dispatch, SetStateAction } from 'react';

type Context<T> = {
  state: T | null;
  action: {
    setState: Dispatch<SetStateAction<T | null>>;
  };
};

const SelectedFoodContext = createContext<Context<FOOD> | null>(null);

const SelectedFoodProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedFood, setSelectedFood] = useState<FOOD | null>(null);

  const context = {
    state: selectedFood,
    action: {
      setState: setSelectedFood,
    },
  };

  return <SelectedFoodContext.Provider value={context}>{children}</SelectedFoodContext.Provider>;
};

export { SelectedFoodProvider, SelectedFoodContext };
