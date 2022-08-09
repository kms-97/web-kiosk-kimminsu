import { FlexContainer, Img } from '../../../../component';
import styles from './FoodItem.module.scss';

interface props {
  food: FOOD;
  onClick: (id: number) => void;
}

const FoodItem = ({ food, onClick }: props) => {
  return (
    <FlexContainer
      flow="column"
      wrap="nowrap"
      onClick={() => onClick(food.id)}
      className={styles.item}
    >
      <Img src={food.imgURL} description={food.name} />
      <div style={{ margin: '5px 0' }}>{food.name}</div>
      <div>{food.basePrice}원</div>
    </FlexContainer>
  );
};

export default FoodItem;
