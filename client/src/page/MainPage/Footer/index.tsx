import { useContext } from 'react';
import { FlexContainer, TransperentButton } from '../../../component';
import { OrderContext } from '../../../context';
import { click } from '../../../util/pointerEvent';
import styles from './Footer.module.scss';
import OrderList from './OrderList';

const Footer = () => {
  const orders = useContext(OrderContext);

  const discardAllOrders = click(10, orders?.action.setState!, []);

  return (
    <footer>
      <OrderList />
      <FlexContainer flow="row" wrap="nowrap" className={styles.middle}>
        <TransperentButton className={styles.button} onPointerDown={discardAllOrders}>
          전체 취소
        </TransperentButton>
        <TransperentButton className={`${styles.button} ${styles.orderBtn}`}>
          주문하기
        </TransperentButton>
      </FlexContainer>
      <FlexContainer
        flow="row"
        wrap="nowrap"
        gap="20px"
        justifyContent="end"
        className={styles.bottom}
      >
        <TransperentButton className={styles.button}>돌아가기</TransperentButton>
        <TransperentButton className={styles.button}>검색하기</TransperentButton>
      </FlexContainer>
    </footer>
  );
};

export default Footer;
