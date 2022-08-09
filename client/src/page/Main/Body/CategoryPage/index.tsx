import { useState } from 'react';
import { FlexContainer } from '../../../../component';
import FoodItem from '../FoodItem';
import styles from './CategoryPage.module.scss';

interface props {
  foods: FOOD[];
}

const CategoryPage = ({ foods }: props) => {
  const [selectedItem, setSelectedItem] = useState<FOOD>();
  const selectItem = (foodId: number) => {
    setSelectedItem(foods.flat().filter(({ id }) => id === foodId)[0]);
  };

  return (
    <FlexContainer flow="row" wrap="wrap" className={styles.page}>
      {foods.map((food) => (
        <FoodItem food={food} onClick={selectItem} key={food.id} />
      ))}
    </FlexContainer>
  );
};

export default CategoryPage;
