import { useContext, useState } from 'react';
import { FlexContainer, ModalContainer, TransperentButton } from 'component';
import { PageContext } from 'context';
import { click } from 'util/pointerEvent';
import PaymentModal from 'page/ModalPage/PaymentModal';
import styles from './Footer.module.scss';

const Footer = () => {
  const page = useContext(PageContext);
  const [isPayProcess, setIsPayProcess] = useState<boolean>(false);

  const openPaymentModal = click({ callback: setIsPayProcess, arg: true });
  const closePaymentModal = click({ callback: setIsPayProcess, arg: false, exact: true });
  const goToCover = click({ callback: page?.action.moveToDefaultPage! });

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
      <FlexContainer
        flow="row"
        wrap="nowrap"
        gap="20px"
        justifyContent="end"
        className={styles.bottom}
      >
        <TransperentButton className={styles.button} onPointerDown={goToCover}>
          돌아가기
        </TransperentButton>
        <TransperentButton className={styles.button} isActive={false}>
          검색하기
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

export default Footer;
