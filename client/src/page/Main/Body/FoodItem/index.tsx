import { FlexContainer, Img } from '../../../../component';
import { click } from '../../../../util/pointerEvent';
import styles from './FoodItem.module.scss';

interface props {
  food: FOOD;
  onClick: (id: number) => void;
}

const FoodItem = ({ food, onClick }: props) => {
  const changeSelectedFoodId = click(10, onClick, food.id);

  return (
    <FlexContainer
      flow="column"
      wrap="nowrap"
      onPointerDown={changeSelectedFoodId}
      className={styles.item}
    >
      <Img src={food.imgURL} description={food.name} />
      <div style={{ margin: '5px 0' }}>{food.name}</div>
      <div>{food.basePrice}원</div>
    </FlexContainer>
  );
};

export default FoodItem;
