import { useContext, useState } from 'react';
import { click } from 'util/pointerEvent';
import { FlexContainer } from 'component';
import { OrderContext, PageContext } from 'context';
import PaymentModal from 'page/ModalPage/PaymentModal';
import styles from './OrderPage.module.scss';
import Footer from 'page/Common/Footer';
import OrderList from './OrderList';
import Buttons from './Buttons';

const OrderPage = () => {
  const page = useContext(PageContext);
  const orders = useContext(OrderContext);
  const [isPayProcess, setIsPayProcess] = useState<boolean>(false);

  const openPaymentModal = click({ callback: setIsPayProcess, arg: true });
  const closePaymentModal = click({ callback: setIsPayProcess, arg: false, exact: true });
  const closeOrderPage = click({ callback: page?.action.removePage! });

  return (
    <div className="page">
      <FlexContainer flow="column" className={styles.order} gap="20px" justifyContent="start">
        <div className={styles.title}>주문 확인</div>
        <OrderList />
        <div className={styles.price}>
          총 결제금액: {orders?.action.getTotalPrice()?.toLocaleString()} 원
        </div>
      </FlexContainer>
      <Buttons openPaymentModal={openPaymentModal} closeOrderPage={closeOrderPage} />
      <Footer />
      {isPayProcess ? <PaymentModal closeModal={closePaymentModal} /> : ''}
    </div>
  );
};

export default OrderPage;
