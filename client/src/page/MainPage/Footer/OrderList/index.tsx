import { useContext } from 'react';
import { DragContainer, FlexContainer } from '../../../../component';
import { OrderContext } from '../../../../context';
import OrderItem from '../OrderItem';
import styles from './OrderList.module.scss';

const OrderList = () => {
  const orders = useContext(OrderContext);
  const totalUnit = orders?.action.getTotalUnit();
  const totalPrice = orders?.action.getTotalPrice().toLocaleString();

  return (
    <FlexContainer flow="column" wrap="nowrap" className={styles.order}>
      <FlexContainer flow="row" wrap="nowrap" justifyContent="spaceBetween" className={styles.desc}>
        <div>주문 목록 {totalUnit}개</div>
        <div>총 주문 금액 {totalPrice}원</div>
      </FlexContainer>
      <DragContainer direction="x" className={styles.list}>
        <FlexContainer flow="row" wrap="nowrap" gap="10px" justifyContent="start">
          {orders?.state.map((order) => (
            <OrderItem order={order} />
          ))}
        </FlexContainer>
      </DragContainer>
    </FlexContainer>
  );
};

export default OrderList;
