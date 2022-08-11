import { FlexContainer, Img, BestIcon } from 'component';
import { click } from 'util/pointerEvent';
import styles from './Item.module.scss';

interface props {
  food: FOOD;
  onClick: (id: number) => void;
}

const Item = ({ food, onClick }: props) => {
  const changeSelectedFoodId = click({ callback: onClick, arg: food.id });

  return (
    <FlexContainer
      flow="column"
      wrap="nowrap"
      onPointerDown={changeSelectedFoodId}
      className={styles.item}
    >
      {food.star ? <BestIcon width="60px" height="60px" className={styles.best} /> : ''}
      <Img src={food.imgURL} description={food.name} />
      <div style={{ margin: '5px 0' }}>{food.name}</div>
      <div>{food.basePrice}원</div>
    </FlexContainer>
  );
};

export default Item;
