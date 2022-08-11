import { FlexContainer, TransperentButton } from 'component';
import { click } from 'util/pointerEvent';
import styles from './Footer.module.scss';

interface props extends PAGE_PROPS {}

const Footer = ({ setPage }: props) => {
  const goToCover = click({ callback: setPage, arg: 'cover' });

  return (
    <FlexContainer
      flow="row"
      wrap="nowrap"
      gap="20px"
      justifyContent="end"
      className={styles.footer}
    >
      <TransperentButton className={styles.button} onPointerDown={goToCover}>
        돌아가기
      </TransperentButton>
      <TransperentButton className={styles.button}>검색하기</TransperentButton>
    </FlexContainer>
  );
};

export default Footer;
