import { FlexContainer, FlipContainer } from '../../../component';
import CategoryPage from './CategoryPage';

interface props {
  foods: FOOD[][];
  getOptions: (arg: number) => { size: SIZE; temperature: TEMPERATURE };
  nextCategory: () => void;
  prevCategory: () => void;
}

const Body = ({ foods, getOptions, nextCategory, prevCategory }: props) => {
  return (
    <main>
      <FlipContainer direction="x" rightFlipEvent={nextCategory} leftFilpEvent={prevCategory}>
        <FlexContainer flow="row" wrap="nowrap" align="start" justify="start">
          {foods.map((foods, index) => (
            <CategoryPage foods={foods} key={index} getOptions={getOptions} />
          ))}
        </FlexContainer>
      </FlipContainer>
    </main>
  );
};

export default Body;
