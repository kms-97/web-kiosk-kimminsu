import { PointerEventHandler, useContext, useLayoutEffect, useState } from 'react';
import { FlexContainer, ModalContainer, OutlineButton, TransperentButton } from 'component';
import { CreditContext, OrderContext, PageContext, PaymentContext } from 'context';
import { click } from 'util/pointerEvent';
import styles from './PaymentModal.module.scss';

interface props {
  closeModal: PointerEventHandler;
}

const PaymentModal = ({ closeModal }: props) => {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | null>(null);
  const page = useContext(PageContext);
  const payment = useContext(PaymentContext);
  const credit = useContext(CreditContext);

  const moveToResultPage = () => {
    page?.action.addPage('result');
  };

  const payWithCard = () => {
    payment?.action.setState('card');
    moveToResultPage();
  };

  const payWithCash = (input: number) => {
    payment?.action.setState('cash');
    credit?.action.setState(input);
    moveToResultPage();
  };

  const SelectMethodPage = () => {
    const onClickCard = click({ callback: payWithCard });
    const onClickCash = click({ callback: setPaymentMethod, arg: 'cash' });

    return (
      <FlexContainer flow="column" gap="30px">
        <div className={styles.title}>결제 방식</div>
        <FlexContainer flow="column" gap="20px">
          <FlexContainer className={styles.payment} justifyContent="spaceBetween" gap="10px">
            <TransperentButton
              className={`${styles.button} ${styles.cash}`}
              onPointerDown={onClickCash}
            >
              현금
            </TransperentButton>
            <TransperentButton
              className={`${styles.button} ${styles.card}`}
              onPointerDown={onClickCard}
            >
              카드
            </TransperentButton>
          </FlexContainer>
          <TransperentButton className={styles.cancel} onPointerDown={closeModal}>
            결제 취소
          </TransperentButton>
        </FlexContainer>
      </FlexContainer>
    );
  };

  const CashPage = () => {
    const orders = useContext(OrderContext);
    const [input, setInput] = useState<number>(0);
    const [isOver, setIsOver] = useState<boolean>(false);
    const need = orders?.action.getTotalPrice();
    const currency = [100, 500, 1000, 5000, 10000, 50000];

    useLayoutEffect(() => {
      if (need) setIsOver(input >= need);
    }, [input, need]);

    const cancel = click({ callback: () => setPaymentMethod(null) });
    const pay = click({ callback: () => payWithCash(input) });

    const InputButton = (unit: number) => {
      const onClick = click({
        callback: () => {
          setInput((prev) => prev + unit);
        },
      });
      return (
        <OutlineButton
          className={styles.button}
          isActive={!isOver}
          isSelected={false}
          onPointerDown={onClick}
        >
          {unit}
        </OutlineButton>
      );
    };

    return (
      <FlexContainer flow="column" gap="30px">
        <div className={styles.title}>현금 결제</div>
        <FlexContainer flow="column" gap="20px">
          <FlexContainer className={styles.currency} justifyContent="spaceBetween" gap="10px">
            {currency.map((unit) => InputButton(unit))}
          </FlexContainer>
          <FlexContainer gap="20px">
            <div>결제 금액: {need?.toLocaleString()}원</div>
            <div>투입 금액: {input.toLocaleString()}원</div>
          </FlexContainer>
          <FlexContainer className={styles.payment} justifyContent="spaceBetween" gap="10px">
            <TransperentButton className={`${styles.button} ${styles.cash}`} onPointerDown={cancel}>
              취소
            </TransperentButton>
            <TransperentButton
              className={`${styles.button} ${styles.card}`}
              isActive={isOver}
              onPointerDown={pay}
            >
              완료
            </TransperentButton>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    );
  };

  return (
    <ModalContainer onPointerDown={closeModal}>
      <div className={styles.modal}>
        {paymentMethod === 'cash' ? <CashPage /> : <SelectMethodPage />}
      </div>
    </ModalContainer>
  );
};

export default PaymentModal;
