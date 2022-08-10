import React, { useState, createContext, Dispatch, SetStateAction } from 'react';
import MainPage from '../page/MainPage';

type Context<T> = {
  state: Array<T>;
  action: {
    setState: Dispatch<SetStateAction<Array<T>>>;
    addPage: (arg: T) => void;
    removePage: () => void;
  };
};

const PageContext = createContext<Context<() => JSX.Element> | null>(null);

const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState<(() => JSX.Element)[]>([MainPage]);

  const addPage = (page: () => JSX.Element) => {
    setPage((prev) => [...prev, page]);
  };

  const removePage = () => {
    setPage((prev) => {
      if (prev.length === 1) return [...prev];
      else return [...prev].slice(0, prev.length - 1);
    });
  };

  const context = {
    state: page,
    action: {
      setState: setPage,
      addPage,
      removePage,
    },
  };

  return <PageContext.Provider value={context}>{children}</PageContext.Provider>;
};

export { PageProvider, PageContext };
