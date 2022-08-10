import { useContext } from 'react';
import { FlexContainer, TransperentButton } from '../../../component';
import { OrderContext, PageContext } from '../../../context';
import { click } from '../../../util/pointerEvent';
import OrderPage from '../../OrderPage';
import styles from './Footer.module.scss';
import OrderList from './OrderList';

const Footer = () => {
  const orders = useContext(OrderContext);
  const page = useContext(PageContext);
  const discardAllOrders = click({ callback: orders?.action.setState!, arg: [] });
  const totalUnit = orders?.action.getTotalUnit()!;
  const toOrderPage = click({ callback: page?.action.addPage!, arg: OrderPage });

  return (
    <footer>
      <OrderList />
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
