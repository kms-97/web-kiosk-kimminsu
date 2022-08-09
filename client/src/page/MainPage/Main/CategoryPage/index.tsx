import { useContext } from 'react';
import { FlexContainer, ModalContainer } from '../../../../component';
import { SelectedFoodContext } from '../../../../context';
import { click } from '../../../../util/pointerEvent';
import FoodItem from '../FoodItem';
import OptionModal from '../OptionModal';
import styles from './CategoryPage.module.scss';

interface props {
  foods: FOOD[];
  getOptions: (arg: number) => { size: SIZE; temperature: TEMPERATURE };
}

const CategoryPage = ({ foods, getOptions }: props) => {
  const selectedFood = useContext(SelectedFoodContext);

  const selectFood = (foodId: number) => {
    selectedFood?.action.setState(foods.flat().filter(({ id }) => id === foodId)[0]);
  };

  const closeModal = click(10, selectedFood?.action.setState!, null, true);

  return (
    <>
      <FlexContainer
        flow="row"
        wrap="wrap"
        className={styles.page}
        justifyContent="start"
        alignContent="start"
        alignItems="start"
      >
        {foods.map((food) => (
          <FoodItem food={food} onClick={selectFood} key={food.id} />
        ))}
      </FlexContainer>
      {selectedFood?.state ? (
        <ModalContainer onPointerDown={closeModal}>
          <OptionModal food={selectedFood.state} getOptions={getOptions} closeModal={closeModal} />
        </ModalContainer>
      ) : (
        ''
      )}
    </>
  );
};

export default CategoryPage;
