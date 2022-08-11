import { useState, useLayoutEffect, useContext } from 'react';
import { CategoriesContext, RenderCategoryIdContext } from 'context';
import CategoryNav from './CategoryNav';
import CategoryItem from './CategoryItem';
import OrderItem from './OrderItem';
import Footer from 'page/Common/Footer';

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
      <CategoryNav categories={categories!.state} />
      <CategoryItem foods={displayCategoryFoods} />
      <OrderItem />
      <Footer />
    </div>
  );
};

export default MainPage;
