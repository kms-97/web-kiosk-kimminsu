import { useContext, Dispatch, SetStateAction } from 'react';
import { FlexContainer, TransperentButton } from 'component';
import { OrderContext } from 'context';
import { click } from 'util/pointerEvent';
import ItemContainer from './ItemContainer';
import styles from './OrderItem.module.scss';

interface props {
  setPage: Dispatch<SetStateAction<PAGE>>;
}

const OrderItem = ({ setPage }: props) => {
  const orders = useContext(OrderContext);
  const discardAllOrders = click({ callback: orders?.action.setState!, arg: [] });
  const totalUnit = orders?.action.getTotalUnit()!;
  const toOrderPage = click({ callback: setPage, arg: 'order' });

  return (
    <>
      <ItemContainer />
      <FlexContainer flow="row" wrap="nowrap" className={styles.middle}>
        <TransperentButton
          className={styles.button}
          onPointerDown={discardAllOrders}
          isActive={totalUnit > 0}
        >
          전체 취소
        </TransperentButton>
        <TransperentButton
          className={`${styles.button} ${styles.orderBtn}`}
          isActive={totalUnit > 0}
          onPointerDown={toOrderPage}
        >
          주문하기
        </TransperentButton>
      </FlexContainer>
    </>
  );
};

export default OrderItem;
