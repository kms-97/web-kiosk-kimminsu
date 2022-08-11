import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

type ArrayContext<T> = {
  state: Array<T>;
  action: {
    setState: Dispatch<SetStateAction<Array<T>>>;
  };
};

type Context<T> = {
  state: T;
  action: {
    setState: Dispatch<SetStateAction<T>>;
    increase: () => void;
    decrease: () => void;
  };
};

const CategoriesContext = createContext<ArrayContext<CATEGORY> | null>(null);
const ActiveCategoryIdContext = createContext<Context<number> | null>(null);
const RenderCategoryIdContext = createContext<ArrayContext<number> | null>(null);

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<CATEGORY[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number>(0);
  const [renderCategoryId, setRenderCategoryId] = useState<number[]>([]);
  const maxCategoryId = useRef<number>(0);
  const minCategoryId = useRef<number>(0);

  useEffect(() => {
    const { max, min } = getMinMaxCategoryId();
    maxCategoryId.current = max;
    minCategoryId.current = min;
    setActiveCategoryId(min);
  }, [categories]);

  useLayoutEffect(() => {
    const newRenderId = [];
    newRenderId.push(getPrevCategoryId(activeCategoryId));
    newRenderId.push(activeCategoryId);
    newRenderId.push(getNextCategoryId(activeCategoryId));

    setRenderCategoryId(newRenderId);
  }, [activeCategoryId]);

  const getAllCategoryId = () => {
    const ids: Array<number> = [];
    categories.forEach(({ id }) => {
      ids.push(id);
    });
    return ids;
  };

  const getMinMaxCategoryId = () => {
    const ids = getAllCategoryId();
    return {
      max: Math.max(...ids),
      min: Math.min(...ids),
    };
  };

  const getNextCategoryId = (targetId: number) => {
    if (targetId === maxCategoryId.current) return minCategoryId.current;
    return targetId + 1;
  };

  const getPrevCategoryId = (targetId: number) => {
    if (targetId === minCategoryId.current) return maxCategoryId.current;
    return targetId - 1;
  };

  const decreaseActiveCategoryId = () => {
    setActiveCategoryId((id) => getPrevCategoryId(id));
  };

  const increaseActiveCategoryId = () => {
    setActiveCategoryId((id) => getNextCategoryId(id));
  };

  const categoriesContext = {
    state: categories,
    action: {
      setState: setCategories,
    },
  };

  const activeCategoryIdContext = {
    state: activeCategoryId,
    action: {
      setState: setActiveCategoryId,
      increase: increaseActiveCategoryId,
      decrease: decreaseActiveCategoryId,
    },
  };

  const renderCategoryIdContext = {
    state: renderCategoryId,
    action: {
      setState: setRenderCategoryId,
    },
  };

  return (
    <CategoriesContext.Provider value={categoriesContext}>
      <ActiveCategoryIdContext.Provider value={activeCategoryIdContext}>
        <RenderCategoryIdContext.Provider value={renderCategoryIdContext}>
          {children}
        </RenderCategoryIdContext.Provider>
      </ActiveCategoryIdContext.Provider>
    </CategoriesContext.Provider>
  );
};

export { CategoryProvider, CategoriesContext, ActiveCategoryIdContext, RenderCategoryIdContext };
