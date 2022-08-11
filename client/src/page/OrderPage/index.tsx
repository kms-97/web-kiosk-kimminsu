import { useContext, useState, Dispatch, SetStateAction } from 'react';
import { click } from 'util/pointerEvent';
import { FlexContainer } from 'component';
import { OrderContext } from 'context';
import { postOrder } from 'api';
import PaymentModal from 'page/ModalPage/PaymentModal';
import LoadingPage from 'page/LoadingPage';
import styles from './OrderPage.module.scss';
import Footer from 'page/Common/Footer';
import OrderList from './OrderList';
import Buttons from './Buttons';

interface props extends PAGE_PROPS {
  setPayment: Dispatch<SetStateAction<PAYMENT | null>>;
  setOrderNum: Dispatch<SetStateAction<number>>;
  setCredit: Dispatch<SetStateAction<number>>;
}

const OrderPage = ({ setPage, setPayment, setOrderNum, setCredit }: props) => {
  const orders = useContext(OrderContext);
  const [isPayProcess, setIsPayProcess] = useState<boolean>(false);
  const [isPaying, setIsPaying] = useState<boolean>(false);

  const openPaymentModal = click({ callback: setIsPayProcess, arg: true });
  const closePaymentModal = click({ callback: setIsPayProcess, arg: false, exact: true });
  const closeOrderPage = click({ callback: setPage, arg: 'main' });

  const tryOrder = async (method: PAYMENT, input: number) => {
    setIsPaying(true);
    const response = await postOrder({ orders: orders?.state!, payment: method });
    setOrderNum(Number(response.data.orderNum));
    setPayment(method);
    setPage('result');
  };

  if (isPaying) return <LoadingPage msg="결제가 진행 중입니다..." />;
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
      <Footer setPage={setPage} />
      {isPayProcess ? (
        <PaymentModal closeModal={closePaymentModal} tryOrder={tryOrder} setCredit={setCredit} />
      ) : (
        ''
      )}
    </div>
  );
};

export default OrderPage;
