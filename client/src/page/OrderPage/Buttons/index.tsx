import { FlexContainer, TransperentButton } from 'component';
import { PointerEventHandler } from 'react';
import styles from './Buttons.module.scss';

interface props {
  openPaymentModal: PointerEventHandler;
  closeOrderPage: PointerEventHandler;
}

const Buttons = ({ openPaymentModal, closeOrderPage }: props) => {
  return (
    <>
      <FlexContainer flow="row" wrap="nowrap" className={styles.middle}>
        <TransperentButton className={styles.button} onPointerDown={closeOrderPage}>
          취소
        </TransperentButton>
        <TransperentButton
          className={`${styles.button} ${styles.orderBtn}`}
          onPointerDown={openPaymentModal}
        >
          결제
        </TransperentButton>
      </FlexContainer>
    </>
  );
};

export default Buttons;
