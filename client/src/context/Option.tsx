import React, { useState, createContext, Dispatch, SetStateAction } from 'react';

type Context<T> = {
  state: T | null;
  action: {
    setState: Dispatch<SetStateAction<T | null>>;
    getById: (arg: number) => { size: SIZE; temperature: TEMPERATURE };
  };
};

const OptionContext = createContext<Context<OPTION> | null>(null);

const OptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [option, setOption] = useState<OPTION | null>(null);

  const getOptions = (id: number) => {
    const size = option!.size[`${id}`];
    const temperature = option!.temperature[`${id}`];
    return { size, temperature };
  };

  const context = {
    state: option,
    action: {
      setState: setOption,
      getById: getOptions,
    },
  };

  return <OptionContext.Provider value={context}>{children}</OptionContext.Provider>;
};

export { OptionProvider, OptionContext };
