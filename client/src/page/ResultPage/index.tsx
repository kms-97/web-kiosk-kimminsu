import { useContext, useRef, useEffect, useLayoutEffect, useState } from 'react';
import { postOrder } from 'api';
import { FlexContainer } from 'component';
import { PAYMENT_STRING, SIZE_STRING, TEMP_STRING } from 'constant';
import { CreditContext, OrderContext, PageContext, PaymentContext } from 'context';
import LoadingPage from 'page/LoadingPage';
import styles from './ResultPage.module.scss';

const ResultPage = () => {
  const orders = useContext(OrderContext);
  const payment = useContext(PaymentContext);
  const credit = useContext(CreditContext);
  const page = useContext(PageContext);
  const [isloading, setIsloading] = useState<boolean>(true);
  const [orderNum, setOrderNum] = useState<number>(0);
  const countRef = useRef<HTMLElement>(null);
  const totalPrice = Number(orders?.action.getTotalPrice());

  useLayoutEffect(() => {
    getOrderResult();
  }, []);

  useEffect(() => {
    if (!isloading) displayCount();
  }, [isloading]);

  const getOrderResult = async () => {
    setIsloading(true);
    const response = await postOrder({ orders: orders?.state!, payment: payment?.state! });
    setOrderNum(Number(response.data.orderNum));
    setIsloading(false);
  };

  const displayCount = () => {
    let leftCount = 10;

    const print = () => {
      if (countRef.current) countRef.current.innerText = leftCount + '';
      leftCount--;
    };

    const countDown = () => {
      if (leftCount === 0) {
        clearInterval(counter);
        page?.action.moveToCoverPage();
      }

      print();
    };

    print();
    let counter = setInterval(countDown, 1000);
  };

  if (isloading)
    return (
      <>
        <LoadingPage msg="결제가 진행 중입니다..." />
      </>
    );
  return (
    <div className="page">
      <FlexContainer flow="column" gap="20px" justifyContent="start" className={styles.result}>
        <div className={styles.title}>주문 확인</div>
        <FlexContainer className={styles.receipt}>
          <FlexContainer flow="column" className={styles.content} alignItems="start" gap="20px">
            <div className={styles.number}>주문 번호 {orderNum}</div>
            <div>주문 상세</div>
            <FlexContainer flow="column" alignItems="start" gap="10px">
              {orders?.state.map((order) => (
                <div>
                  {order.name}, {TEMP_STRING[order.temperature]}, {SIZE_STRING[order.size]},{' '}
                  {order.unit}개
                </div>
              ))}
            </FlexContainer>
            <FlexContainer flow="column" alignItems="start" gap="10px">
              <div>결제 방식: {PAYMENT_STRING[payment?.state!]}</div>
              <div>결제 금액: {totalPrice.toLocaleString()}원</div>
              {payment?.state === 'cash' ? (
                <>
                  <div>투입 금액: {credit?.state!.toLocaleString()}원</div>
                  <div>반환 금액: {(credit?.state! - totalPrice).toLocaleString()}원</div>
                </>
              ) : (
                ''
              )}
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
        <div>
          이 화면은 <span ref={countRef}></span>초 뒤 사라집니다.
        </div>
      </FlexContainer>
    </div>
  );
};

export default ResultPage;
