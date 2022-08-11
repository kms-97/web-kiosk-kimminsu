import { useContext } from 'react';
import { DragContainer, FlexContainer, ModalContainer } from 'component';
import { SelectedFoodContext } from 'context';
import { click } from 'util/pointerEvent';
import Item from '../Item';
import OptionModal from 'page/ModalPage/OptionModal';
import styles from './ItemContainer.module.scss';

interface props {
  foods: FOOD[];
}

const ItemContainer = ({ foods }: props) => {
  const selectedFood = useContext(SelectedFoodContext);

  const selectFood = (foodId: number) => {
    selectedFood?.action.setState(foods.flat().filter(({ id }) => id === foodId)[0]);
  };

  const closeModal = click({ callback: selectedFood?.action.setState!, arg: null, exact: true });

  return (
    <>
      <DragContainer direction="y">
        <FlexContainer
          flow="row"
          wrap="wrap"
          justifyContent="start"
          alignContent="start"
          alignItems="start"
        >
          {foods.length ? (
            foods.map((food) => <Item food={food} onClick={selectFood} key={food.id} />)
          ) : (
            <div className={styles.empty}>주문 가능한 항목이 없습니다.</div>
          )}
        </FlexContainer>
      </DragContainer>
      {selectedFood?.state ? (
        <ModalContainer onPointerDown={closeModal}>
          <OptionModal food={selectedFood.state} closeModal={closeModal} />
        </ModalContainer>
      ) : (
        ''
      )}
    </>
  );
};

export default ItemContainer;