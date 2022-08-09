import { FlexContainer, FlipContainer } from '../../../component';
import CategoryPage from './CategoryPage';
import styles from './Main.module.scss';

interface props {
  foods: FOOD[][];
  getOptions: (arg: number) => { size: SIZE; temperature: TEMPERATURE };
  addOrderItems: (item: ORDERITEM) => void;
  nextCategory: () => void;
  prevCategory: () => void;
}

const Main = ({ foods, getOptions, nextCategory, prevCategory, addOrderItems }: props) => {
  return (
    <main>
      <FlipContainer
        direction="x"
        rightFlipEvent={nextCategory}
        leftFilpEvent={prevCategory}
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
            <CategoryPage
              foods={foods}
              key={index}
              getOptions={getOptions}
              addOrderItems={addOrderItems}
            />
          ))}
        </FlexContainer>
      </FlipContainer>
    </main>
  );
};

export default Main;
