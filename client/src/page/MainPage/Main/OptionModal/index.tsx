import { useState, useEffect } from 'react';
import { FlexContainer, Img } from '../../../../component';
import SizeOption from './SizeOption';
import TemperatureOption from './TemperatureOption';
import styles from './OptionModal.module.scss';
import UnitOption from './UnitOption';

interface props {
  food: FOOD;
  getOptions: (arg: number) => { size: SIZE; temperature: TEMPERATURE };
}

const OptionModal = ({ food, getOptions }: props) => {
  const [eachPrice, setEachPrice] = useState<number>(0);
  const [unit, setUnit] = useState<number>(1);
  const { size, temperature } = getOptions(food.id);

  useEffect(() => {
    setEachPrice(Number(food.basePrice));
  }, [food]);

  const changeEachPrice = (beforePrice: number, afterPrice: number) => {
    setEachPrice((prev) => prev - beforePrice + afterPrice);
  };

  const increaseUnit = () => {
    setUnit((prev) => prev + 1);
  };

  const decreaseUnit = () => {
    setUnit((prev) => prev - 1);
  };

  return (
    <div className={styles.modal}>
      <FlexContainer flow="column" wrap="nowrap" gap="10px">
        <FlexContainer flow="row" wrap="nowrap" justifyContent="spaceAround">
          <Img src={food.imgURL} description={food.name} className={styles.img} />
          <FlexContainer flow="column" wrap="nowrap" gap="10px" className={styles.name}>
            <div>{food.name}</div>
            <div>{eachPrice * unit} 원</div>
          </FlexContainer>
        </FlexContainer>
        <div>수량</div>
        <UnitOption unit={unit} increaseUnit={increaseUnit} decreaseUnit={decreaseUnit} />
        <div>크기</div>
        <SizeOption size={size} changeEachPrice={changeEachPrice} />
        <div>온도</div>
        <TemperatureOption temperature={temperature} changeEachPrice={changeEachPrice} />
      </FlexContainer>
    </div>
  );
};

export default OptionModal;
