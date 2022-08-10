import { useContext } from 'react';
import {
  CrossIcon,
  FlexContainer,
  MinusIcon,
  PlusIcon,
  TransperentButton,
} from '../../../../component';
import { OrderContext } from '../../../../context';
import { click } from '../../../../util/pointerEvent';
import styles from './OrderItem.module.scss';

interface props {
  order: ORDERFOOD;
}

const OrderItem = ({ order }: props) => {
  const orders = useContext(OrderContext);
  const discardOrder = click(10, orders?.action.deleteState!, order);
  const increaseUnit = click(10, orders?.action.addState!, {
    id: order.id,
    size: order.size,
    temperature: order.temperature,
    unit: 1,
  });
  const decreaseUnit = click(10, orders?.action.addState!, {
    id: order.id,
    size: order.size,
    temperature: order.temperature,
    unit: -1,
  });
  const sizeString = { s: 'small', m: 'medium', l: 'large' };
  const temperatureString = { h: 'hot', c: 'ice' };

  return (
    <FlexContainer flow="column" wrap="nowrap" className={styles.card} gap="10px">
      <TransperentButton className={styles.delete} onPointerDown={discardOrder}>
        <CrossIcon width="18px" height="18px" />
      </TransperentButton>
      <div className={styles.name}>{order.name}</div>
      <FlexContainer flow="row" wrap="nowrap" justifyContent="spaceAround" gap="10px">
        <div className={styles.option}>{sizeString[order.size]}</div>
        <div className={styles.option}>{temperatureString[order.temperature]}</div>
      </FlexContainer>
      <FlexContainer flow="row" wrap="nowrap" gap="10px">
        <TransperentButton onPointerDown={decreaseUnit} isActive={order.unit > 1}>
          <MinusIcon width="16px" height="16px" />
        </TransperentButton>
        <div className={styles.unit}>{order.unit}</div>
        <TransperentButton onPointerDown={increaseUnit}>
          <PlusIcon width="16px" height="16px" />
        </TransperentButton>
      </FlexContainer>
    </FlexContainer>
  );
};

export default OrderItem;
