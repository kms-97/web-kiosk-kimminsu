import { useContext } from 'react';
import { FlexContainer, FlipContainer } from '../../../component';
import { ActiveCategoryIdContext } from '../../../context';
import CategoryPage from './CategoryPage';
import styles from './Main.module.scss';

interface props {
  foods: FOOD[][];
}

const Main = ({ foods }: props) => {
  const activeCategoryId = useContext(ActiveCategoryIdContext);

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
            <CategoryPage foods={foods} key={index} />
          ))}
        </FlexContainer>
      </FlipContainer>
    </main>
  );
};

export default Main;
