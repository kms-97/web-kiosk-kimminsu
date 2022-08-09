import { useState } from 'react';
import { FlexContainer, ModalContainer } from '../../../../component';
import { click } from '../../../../util/pointerEvent';
import FoodItem from '../FoodItem';
import OptionModal from '../OptionModal';
import styles from './CategoryPage.module.scss';

interface props {
  foods: FOOD[];
  getOptions: (arg: number) => { size: SIZE; temperature: TEMPERATURE };
}

const CategoryPage = ({ foods, getOptions }: props) => {
  const [selectedItem, setSelectedItem] = useState<FOOD>();

  const selectItem = (foodId: number) => {
    setSelectedItem(foods.flat().filter(({ id }) => id === foodId)[0]);
  };

  const closeModal = click(10, setSelectedItem, undefined, true);

  return (
    <>
      <FlexContainer flow="row" wrap="wrap" className={styles.page} justifyContent="start">
        {foods.map((food) => (
          <FoodItem food={food} onClick={selectItem} key={food.id} />
        ))}
      </FlexContainer>
      {selectedItem ? (
        <ModalContainer onPointerDown={closeModal}>
          <OptionModal food={selectedItem} getOptions={getOptions} />
        </ModalContainer>
      ) : (
        ''
      )}
    </>
  );
};

export default CategoryPage;
