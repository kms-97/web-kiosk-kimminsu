import { useContext, useRef, useEffect } from 'react';
import { DragContainer, FlexContainer } from 'component';
import { PAYMENT_STRING, SIZE_STRING, TEMP_STRING } from 'constant';
import { OrderContext } from 'context';
import styles from './ResultPage.module.scss';

interface props extends PAGE_PROPS {
  payment: PAYMENT;
  orderNum: number;
  credit: number;
}

const ResultPage = ({ setPage, payment, orderNum, credit }: props) => {
  const orders = useContext(OrderContext);
  const countRef = useRef<HTMLElement>(null);
  const totalPrice = Number(orders?.action.getTotalPrice());

  useEffect(() => {
    displayCount();
  }, []);

  const displayCount = () => {
    let leftCount = 10;

    const print = () => {
      if (countRef.current) countRef.current.innerText = leftCount + '';
      leftCount--;
    };

    const countDown = () => {
      if (leftCount === 0) {
        clearInterval(counter);
        setPage('cover');
      }

      print();
    };

    print();
    let counter = setInterval(countDown, 1000);
  };

  return (
    <div className="page">
      <FlexContainer flow="column" gap="20px" justifyContent="start" className={styles.result}>
        <div className={styles.title}>주문 확인</div>
        <FlexContainer className={styles.receipt}>
          <DragContainer direction="y" className={styles.container}>
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
                <div>결제 방식: {PAYMENT_STRING[payment]}</div>
                <div>결제 금액: {totalPrice.toLocaleString()}원</div>
                {payment === 'cash' ? (
                  <>
                    <div>투입 금액: {credit.toLocaleString()}원</div>
                    <div>반환 금액: {(credit - totalPrice).toLocaleString()}원</div>
                  </>
                ) : (
                  ''
                )}
              </FlexContainer>
            </FlexContainer>
          </DragContainer>
        </FlexContainer>
        <div>
          이 화면은 <span ref={countRef}></span>초 뒤 사라집니다.
        </div>
      </FlexContainer>
    </div>
  );
};

export default ResultPage;
