import { useContext, useEffect, useState } from 'react';
import { getCategory, getFood, getOption } from 'api';
import { CategoriesContext, OptionContext } from 'context';
import CoverPage from 'page/CoverPage';
import MainPage from 'page/MainPage';
import OrderPage from 'page/OrderPage';
import ResultPage from 'page/ResultPage';

const DefaultPage = 'cover';

const Router = () => {
  const categories = useContext(CategoriesContext);
  const options = useContext(OptionContext);
  const [foods, setFoods] = useState<FOOD[]>([]);
  const [page, setPage] = useState<PAGE>(DefaultPage);
  const [payment, setPayment] = useState<PAYMENT | null>(null);
  const [credit, setCredit] = useState<number>(0);
  const [orderNum, setOrderNum] = useState<number>(0);

  useEffect(() => {
    if (page === 'main') initState();
    if (page === 'cover') initDatas();
  }, [page]);

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

  const initState = () => {
    setPayment(null);
    setOrderNum(0);
    setCredit(0);
  };

  if (page === 'cover') return <CoverPage setPage={setPage} />;
  if (page === 'main') return <MainPage foods={foods} setPage={setPage} />;
  if (page === 'order')
    return (
      <OrderPage
        setPage={setPage}
        setPayment={setPayment}
        setOrderNum={setOrderNum}
        setCredit={setCredit}
      />
    );
  if (page === 'result')
    return <ResultPage setPage={setPage} payment={payment!} orderNum={orderNum} credit={credit} />;
  return <CoverPage setPage={setPage} />;
};

export default Router;
