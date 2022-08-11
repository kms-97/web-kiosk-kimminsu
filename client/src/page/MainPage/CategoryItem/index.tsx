import { useContext, useState } from 'react';
import { FlexContainer, FlipContainer } from 'component';
import { ActiveCategoryIdContext } from 'context';
import ItemContainer from './ItemContainer';
import styles from './Main.module.scss';
import OptionModal from 'page/ModalPage/OptionModal';

interface props {
  foods: FOOD[][];
}

const CategoryItem = ({ foods }: props) => {
  const activeCategoryId = useContext(ActiveCategoryIdContext);
  const [selectedFood, setSelectedFood] = useState<FOOD | null>(null);

  const selectFood = (foodId: number) => {
    setSelectedFood(foods.flat().filter(({ id }) => id === foodId)[0]);
  };

  return (
    <main>
      <FlipContainer
        rightFlipEvent={activeCategoryId?.action.increase}
        leftFilpEvent={activeCategoryId?.action.decrease}
        className={styles.container}
      >
        <FlexContainer
          flow="row"
          wrap="nowrap"
          alignItems="start"
          justifyContent="start"
          className={styles.container}
        >
          {foods.map((foods, index) => (
            <ItemContainer foods={foods} key={index} selectFood={selectFood} />
          ))}
        </FlexContainer>
      </FlipContainer>
      {selectedFood ? <OptionModal food={selectedFood} setSelectedFood={setSelectedFood} /> : ''}
    </main>
  );
};

export default CategoryItem;
