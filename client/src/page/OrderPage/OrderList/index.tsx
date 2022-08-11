import { useContext } from 'react';
import { DragContainer, FlexContainer } from '../../../component';
import { OrderContext } from '../../../context';
import OrderItem from '../OrderItem';
import styles from './OrderList.module.scss';

const OrderList = () => {
  const orders = useContext(OrderContext);
  return (
    <DragContainer className={styles.list} direction="y">
      <FlexContainer flow="column">
        {orders?.state.map((order) => (
          <OrderItem order={order} />
        ))}
      </FlexContainer>
    </DragContainer>
  );
};

export default OrderList;
