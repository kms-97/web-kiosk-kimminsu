import { useContext } from 'react';
import { FlexContainer } from 'component';
import { OrderContext } from 'context';
import Buttons from './Buttons';
import OrderList from './OrderList';
import styles from './OrderPage.module.scss';
import Footer from 'page/Common/Footer';

const OrderPage = () => {
  const orders = useContext(OrderContext);

  return (
    <div className="page">
      <FlexContainer flow="column" className={styles.order} gap="20px" justifyContent="start">
        <div className={styles.title}>주문 확인</div>
        <OrderList />
        <div className={styles.price}>
          총 결제금액: {orders?.action.getTotalPrice()?.toLocaleString()} 원
        </div>
      </FlexContainer>
      <Buttons />
      <Footer />
    </div>
  );
};

export default OrderPage;
