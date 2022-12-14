import {
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { FlexContainer, Img, ModalContainer, TransperentButton } from 'component';
import SizeOption from './SizeOption';
import TemperatureOption from './TemperatureOption';
import styles from './OptionModal.module.scss';
import UnitOption from './UnitOption';
import { click } from 'util/pointerEvent';
import { OptionContext, OrderContext } from 'context';

interface props {
  food: FOOD;
  setSelectedFood: Dispatch<SetStateAction<FOOD | null>>;
}

const OptionModal = ({ food, setSelectedFood }: props) => {
  const option = useContext(OptionContext);
  const [eachPrice, setEachPrice] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedTemperature, setSelectedTemperature] = useState<string | null>(null);
  const [unit, setUnit] = useState<number>(1);
  const order = useContext(OrderContext);
  const options = useRef(option!.action.getById(food.id));

  useLayoutEffect(() => {
    options.current = option!.action.getById(food.id);
    setEachPrice(Number(food.basePrice));
  }, [food]);

  useEffect(() => {
    const sizePrice = selectedSize ? Number(options.current.size[selectedSize]) : 0;
    const tempPrice = selectedTemperature
      ? Number(options.current.temperature[selectedTemperature])
      : 0;
    setEachPrice(Number(food.basePrice) + sizePrice + tempPrice);
  }, [selectedSize, selectedTemperature]);

  const increaseUnit = () => {
    setUnit((prev) => prev + 1);
  };

  const decreaseUnit = () => {
    setUnit((prev) => prev - 1);
  };

  const addToOrder = (arg: ORDERFOOD) => {
    order?.action.addState(arg);
    setSelectedFood(null);
  };

  const closeModal = click({ callback: setSelectedFood, arg: null, exact: true });
  const addFoodToOrder = click({
    callback: addToOrder,
    arg: {
      id: food.id,
      name: food.name,
      unit,
      size: selectedSize,
      temperature: selectedTemperature,
      eachPrice,
      imgURL: food.imgURL,
    },
  });

  return (
    <ModalContainer onPointerDown={closeModal}>
      <div className={styles.modal}>
        <FlexContainer flow="column" wrap="nowrap" gap="20px" className={styles.info}>
          <FlexContainer flow="row" wrap="nowrap" justifyContent="spaceAround">
            <Img src={food.imgURL} description={food.name} className={styles.img} />
            <FlexContainer flow="column" wrap="nowrap" gap="5px" className={styles.name}>
              <div>{food.name}</div>
              <div>{eachPrice * unit} ???</div>
            </FlexContainer>
          </FlexContainer>
          <UnitOption unit={unit} increaseUnit={increaseUnit} decreaseUnit={decreaseUnit} />
          <SizeOption
            option={options.current.size}
            size={selectedSize}
            selectSize={setSelectedSize}
          />
          <TemperatureOption
            option={options.current.temperature}
            temperature={selectedTemperature}
            selectTemperature={setSelectedTemperature}
          />
        </FlexContainer>
        <FlexContainer flow="row" wrap="nowrap">
          <TransperentButton
            className={`${styles.button} ${styles.grey}`}
            onPointerDown={closeModal}
          >
            ??????
          </TransperentButton>
          <TransperentButton
            className={`${styles.button} ${styles.primary}`}
            onPointerDown={addFoodToOrder}
            isActive={Boolean(selectedSize && selectedTemperature)}
          >
            ??????
          </TransperentButton>
        </FlexContainer>
      </div>
    </ModalContainer>
  );
};

export default OptionModal;
