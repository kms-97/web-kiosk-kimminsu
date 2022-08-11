import { useContext, useState } from 'react';
import { FlexContainer, ModalContainer, TransperentButton } from 'component';
import { PageContext } from 'context';
import { click } from 'util/pointerEvent';
import PaymentModal from 'page/ModalPage/PaymentModal';
import styles from './Buttons.module.scss';

const Buttons = () => {
  const page = useContext(PageContext);
  const [isPayProcess, setIsPayProcess] = useState<boolean>(false);

  const openPaymentModal = click({ callback: setIsPayProcess, arg: true });
  const closePaymentModal = click({ callback: setIsPayProcess, arg: false, exact: true });

  return (
    <>
      <FlexContainer flow="row" wrap="nowrap" className={styles.middle}>
        <TransperentButton className={styles.button} onPointerDown={page?.action.removePage}>
          취소
        </TransperentButton>
        <TransperentButton
          className={`${styles.button} ${styles.orderBtn}`}
          onPointerDown={openPaymentModal}
        >
          결제
        </TransperentButton>
      </FlexContainer>
      {isPayProcess ? (
        <ModalContainer onPointerDown={closePaymentModal}>
          <PaymentModal closeModal={closePaymentModal} />
        </ModalContainer>
      ) : (
        ''
      )}
    </>
  );
};

export default Buttons;
