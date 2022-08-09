import { useCallback, useEffect, useState, useLayoutEffect, useContext } from 'react';
import { CategoriesContext, RenderCategoryIdContext } from '../../context';
import { getCategory, getFood, getOption } from '../../api';
import Main from './Main';
import Header from './Header';

const MainPage = () => {
  const categories = useContext(CategoriesContext);
  const renderCategoryId = useContext(RenderCategoryIdContext);
  const [foods, setFoods] = useState<FOOD[]>([]);
  const [options, setOptions] = useState<OPTION>({ size: {}, temperature: {} });
  const [displayCategoryFoods, setdisplayCategoryFoods] = useState<FOOD[][]>([[]]);

  useEffect(() => {
    initDatas();
  }, []);

  useLayoutEffect(() => {
    const newFoods: FOOD[][] = [];
    renderCategoryId?.state.forEach((id) => {
      newFoods.push(foods.filter(({ categoryId }) => categoryId === id));
    });

    setdisplayCategoryFoods(newFoods);
  }, [renderCategoryId, foods]);

  const initDatas = useCallback(async () => {
    const foodData = getFood();
    const categoryData = getCategory();
    const optionData = getOption();

    Promise.all([foodData, categoryData, optionData]).then(([food, category, option]) => {
      setFoods(food.data);
      categories?.action.setState(category.data);
      setOptions(option.data);
    });
  }, []);

  const getOptions = (id: number) => {
    const size = options.size[`${id}`];
    const temperature = options.temperature[`${id}`];
    return { size, temperature };
  };

  return (
    <>
      <Header categories={categories!.state} />
      <Main foods={displayCategoryFoods} getOptions={getOptions} />
    </>
  );
};

export default MainPage;
