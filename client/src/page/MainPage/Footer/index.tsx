import { FlexContainer, TransperentButton } from '../../../component';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className={styles.top}></div>
      <FlexContainer flow="row" wrap="nowrap" className={styles.middle}>
        <TransperentButton className={styles.button}>전체 취소</TransperentButton>
        <TransperentButton className={styles.button}>주문하기</TransperentButton>
      </FlexContainer>
      <FlexContainer
        flow="row"
        wrap="nowrap"
        gap="20px"
        justifyContent="end"
        className={styles.bottom}
      >
        <TransperentButton className={styles.button}>돌아가기</TransperentButton>
        <TransperentButton className={styles.button}>검색하기</TransperentButton>
      </FlexContainer>
    </footer>
  );
};

export default Footer;
