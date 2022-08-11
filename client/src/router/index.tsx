import { useContext, useEffect, useState } from 'react';
import { getCategory, getFood, getOption } from 'api';
import { CategoriesContext, OptionContext, PageContext } from 'context';
import CoverPage from 'page/CoverPage';
import MainPage from 'page/MainPage';
import OrderPage from 'page/OrderPage';
import ResultPage from 'page/ResultPage';

const DefaultPage = 'cover';

const Router = () => {
  const categories = useContext(CategoriesContext);
  const options = useContext(OptionContext);
  const pages = useContext(PageContext);
  const [foods, setFoods] = useState<FOOD[]>([]);
  const activePage = pages?.state ? [...pages?.state].pop() ?? DefaultPage : DefaultPage;

  useEffect(() => {
    initDatas();
  }, []);

  const initDatas = async () => {
    const foodData = getFood();
    const categoryData = getCategory();
    const optionData = getOption();

    Promise.all([foodData, categoryData, optionData]).then(([food, category, option]) => {
      setFoods(food.data);
      categories?.action.setState(category.data);
      options?.action.setState(option.data);
    });
  };

  if (activePage === 'cover') return <CoverPage />;
  if (activePage === 'main') return <MainPage foods={foods} />;
  if (activePage === 'order') return <OrderPage />;
  if (activePage === 'result') return <ResultPage />;
  return <CoverPage />;
};

export default Router;
