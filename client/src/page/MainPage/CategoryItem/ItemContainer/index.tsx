import { DragContainer, FlexContainer } from 'component';
import Item from '../Item';
import styles from './ItemContainer.module.scss';

interface props {
  foods: FOOD[];
  selectFood: (arg: number) => void;
}

const ItemContainer = ({ foods, selectFood }: props) => {
  return (
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
  );
};

export default ItemContainer;
