import { useCallback, useEffect, useState, useRef, useLayoutEffect } from 'react';
import { getCategory, getFood, getOption } from '../../api';
import Main from './Main';
import Header from './Header';

const MainPage = () => {
  const [categories, setCategories] = useState<CATEGORY[]>([]);
  const [foods, setFoods] = useState<FOOD[]>([]);
  const [options, setOptions] = useState<OPTION>({ size: {}, temperature: {} });
  const [orderItems, setOrderItems] = useState<ORDERITEM[]>([]);
  const [displayCategoryFoods, setdisplayCategoryFoods] = useState<FOOD[][]>([[]]);
  const [activeCategoryId, setActiveCategoryId] = useState<number>(0);
  const maxCategoryId = useRef<number>(0);
  const minCategoryId = useRef<number>(0);

  useEffect(() => {
    initDatas();
  }, []);

  useEffect(() => {
    const { max, min } = getMinMaxCategoryId();
    maxCategoryId.current = max;
    minCategoryId.current = min;
    setActiveCategoryId(min);
  }, [categories]);

  useLayoutEffect(() => {
    const newFoods = [];
    const nextCategoryId = getNextCategoryId(activeCategoryId);
    const prevCategoryId = getPrevCategoryId(activeCategoryId);

    newFoods.push(foods.filter(({ categoryId }) => categoryId === prevCategoryId));
    newFoods.push(foods.filter(({ categoryId }) => categoryId === activeCategoryId));
    newFoods.push(foods.filter(({ categoryId }) => categoryId === nextCategoryId));
    setdisplayCategoryFoods(newFoods);
  }, [activeCategoryId, foods]);

  const initDatas = useCallback(async () => {
    const foodData = getFood();
    const categoryData = getCategory();
    const optionData = getOption();

    Promise.all([foodData, categoryData, optionData]).then(([food, category, option]) => {
      setFoods(food.data);
      setCategories(category.data);
      setOptions(option.data);
    });
  }, []);

  const getOptions = (id: number) => {
    const size = options.size[`${id}`];
    const temperature = options.temperature[`${id}`];
    return { size, temperature };
  };

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

  const addOrderItems = (item: ORDERITEM) => {
    setOrderItems((prev) => {
      const newItems = [...prev];
      let idx;

      for (let i = 0; i < newItems.length; i++) {
        if (newItems[i].isEqual(item)) {
          idx = i;
          break;
        }
      }

      if (idx !== undefined) newItems[idx].unit += item.unit;
      else newItems.push(item);

      return newItems;
    });
  };

  return (
    <>
      <Header
        onClick={setActiveCategoryId}
        categories={categories}
        activeCategoryId={activeCategoryId}
      />
      <Main
        foods={displayCategoryFoods}
        getOptions={getOptions}
        addOrderItems={addOrderItems}
        prevCategory={decreaseActiveCategoryId}
        nextCategory={increaseActiveCategoryId}
      />
    </>
  );
};

export default MainPage;
