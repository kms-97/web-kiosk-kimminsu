import React, { useCallback, useEffect, useState, useLayoutEffect, useContext } from 'react';
import { CategoriesContext, OptionContext, RenderCategoryIdContext } from '../../context';
import { getCategory, getFood, getOption } from '../../api';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';

const MainPage = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<string>> }) => {
  const renderCategoryId = useContext(RenderCategoryIdContext);
  const categories = useContext(CategoriesContext);
  const options = useContext(OptionContext);
  const [foods, setFoods] = useState<FOOD[]>([]);
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
      options?.action.setState(option.data);
    });
  }, []);

  return (
    <div className="page">
      <Header categories={categories!.state} />
      <Main foods={displayCategoryFoods} />
      <Footer setPage={setPage} />
    </div>
  );
};

export default MainPage;
