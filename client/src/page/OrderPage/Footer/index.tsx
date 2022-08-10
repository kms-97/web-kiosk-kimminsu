import { FlexContainer, TransperentButton } from '../../../component';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <>
      <FlexContainer flow="row" wrap="nowrap" className={styles.middle}>
        <TransperentButton className={styles.button}>취소</TransperentButton>
        <TransperentButton className={`${styles.button} ${styles.orderBtn}`}>
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
        <TransperentButton className={styles.button}>돌아가기</TransperentButton>
        <TransperentButton className={styles.button} isActive={false}>
          검색하기
        </TransperentButton>
      </FlexContainer>
    </>
  );
};

export default Footer;
