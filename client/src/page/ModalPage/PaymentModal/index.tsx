import { PointerEventHandler } from 'react';
import { FlexContainer, TransperentButton } from '../../../component';
import styles from './PaymentModal.module.scss';

interface props {
  closeModal: PointerEventHandler;
}

const PaymentModal = ({ closeModal }: props) => {
  return (
    <div className={styles.modal}>
      <FlexContainer flow="column" gap="30px">
        <div className={styles.title}>결제 방식</div>
        <FlexContainer flow="column" gap="20px">
          <FlexContainer className={styles.payment} justifyContent="spaceBetween" gap="10px">
            <TransperentButton className={`${styles.button} ${styles.cash}`}>
              현금
            </TransperentButton>
            <TransperentButton className={`${styles.button} ${styles.card}`}>
              카드
            </TransperentButton>
          </FlexContainer>
          <TransperentButton className={styles.cancel} onPointerDown={closeModal}>
            결제 취소
          </TransperentButton>
        </FlexContainer>
      </FlexContainer>
    </div>
  );
};

export default PaymentModal;
