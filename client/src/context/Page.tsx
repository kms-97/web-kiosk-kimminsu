import React, { useState, createContext, Dispatch, SetStateAction } from 'react';

type PAGE = 'cover' | 'main' | 'order' | 'result';
type Context<T> = {
  state: Array<T>;
  action: {
    setState: Dispatch<SetStateAction<Array<T>>>;
    addPage: (arg: PAGE) => void;
    removePage: () => void;
    moveToDefaultPage: () => void;
  };
};

const DefaultPage = 'cover';
const PageContext = createContext<Context<PAGE> | null>(null);

const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState<PAGE[]>([DefaultPage]);

  const addPage = (page: PAGE) => {
    setPage((prev) => [...prev, page]);
  };

  const removePage = () => {
    setPage((prev) => {
      if (prev.length === 1) return [...prev];
      else return [...prev].slice(0, prev.length - 1);
    });
  };

  const moveToDefaultPage = () => {
    setPage([DefaultPage]);
  };

  const context = {
    state: page,
    action: {
      setState: setPage,
      addPage,
      removePage,
      moveToDefaultPage,
    },
  };

  return <PageContext.Provider value={context}>{children}</PageContext.Provider>;
};

export { PageProvider, PageContext };
