import { useState, useLayoutEffect, useContext } from 'react';
import { CategoriesContext, RenderCategoryIdContext } from 'context';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';

interface props {
  foods: FOOD[];
}

const MainPage = ({ foods }: props) => {
  const renderCategoryId = useContext(RenderCategoryIdContext);
  const categories = useContext(CategoriesContext);
  const [displayCategoryFoods, setdisplayCategoryFoods] = useState<FOOD[][]>([[]]);

  useLayoutEffect(() => {
    const newFoods: FOOD[][] = [];
    renderCategoryId?.state.forEach((id) => {
      newFoods.push(foods.filter(({ categoryId }) => categoryId === id));
    });

    setdisplayCategoryFoods(newFoods);
  }, [renderCategoryId, foods]);

  return (
    <div className="page">
      <Header categories={categories!.state} />
      <Main foods={displayCategoryFoods} />
      <Footer />
    </div>
  );
};

export default MainPage;
