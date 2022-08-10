import {
  useState,
  useLayoutEffect,
  PointerEventHandler,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { FlexContainer, Img, TransperentButton } from '../../../component';
import SizeOption from './SizeOption';
import TemperatureOption from './TemperatureOption';
import styles from './OptionModal.module.scss';
import UnitOption from './UnitOption';
import { click } from '../../../util/pointerEvent';
import { OptionContext, OrderContext, SelectedFoodContext } from '../../../context';

interface props {
  food: FOOD;
  closeModal: PointerEventHandler;
}

const OptionModal = ({ food, closeModal }: props) => {
  const option = useContext(OptionContext);
  const [eachPrice, setEachPrice] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('s');
  const [selectedTemperature, setSelectedTemperature] = useState<string>('h');
  const [unit, setUnit] = useState<number>(1);
  const order = useContext(OrderContext);
  const selectedFood = useContext(SelectedFoodContext);
  const options = useRef(option!.action.getById(food.id));

  useLayoutEffect(() => {
    options.current = option!.action.getById(food.id);
    setEachPrice(Number(food.basePrice));
  }, [food]);

  useEffect(() => {
    setEachPrice(
      Number(food.basePrice) +
        Number(options.current.size[selectedSize])! +
        Number(options.current.temperature[selectedTemperature])!,
    );
  }, [selectedSize, selectedTemperature]);

  const increaseUnit = () => {
    setUnit((prev) => prev + 1);
  };

  const decreaseUnit = () => {
    setUnit((prev) => prev - 1);
  };

  const addToOrder = (arg: ORDERFOOD) => {
    order?.action.addState(arg);
    selectedFood?.action.setState(null);
  };

  const onClickSubmitBtn = click(10, addToOrder, {
    id: food.id,
    name: food.name,
    unit,
    size: selectedSize,
    temperature: selectedTemperature,
    eachPrice,
    imgURL: food.imgURL,
  });

  return (
    <div className={styles.modal}>
      <FlexContainer flow="column" wrap="nowrap" gap="20px" className={styles.info}>
        <FlexContainer flow="row" wrap="nowrap" justifyContent="spaceAround">
          <Img src={food.imgURL} description={food.name} className={styles.img} />
          <FlexContainer flow="column" wrap="nowrap" gap="5px" className={styles.name}>
            <div>{food.name}</div>
            <div>{eachPrice * unit} 원</div>
          </FlexContainer>
        </FlexContainer>
        <div>수량</div>
        <UnitOption unit={unit} increaseUnit={increaseUnit} decreaseUnit={decreaseUnit} />
        <div>크기</div>
        <SizeOption
          option={options.current.size}
          size={selectedSize}
          selectSize={setSelectedSize}
        />
        <div>온도</div>
        <TemperatureOption
          option={options.current.temperature}
          temperature={selectedTemperature}
          selectTemperature={setSelectedTemperature}
        />
      </FlexContainer>
      <FlexContainer flow="row" wrap="nowrap">
        <TransperentButton className={`${styles.button} ${styles.grey}`} onPointerDown={closeModal}>
          취소
        </TransperentButton>
        <TransperentButton
          className={`${styles.button} ${styles.primary}`}
          onPointerDown={onClickSubmitBtn}
        >
          완료
        </TransperentButton>
      </FlexContainer>
    </div>
  );
};

export default OptionModal;
