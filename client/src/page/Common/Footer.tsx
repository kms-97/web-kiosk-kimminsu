import { FlexContainer, TransperentButton } from 'component';
import { PageContext } from 'context';
import { useContext } from 'react';
import { click } from 'util/pointerEvent';
import styles from './Footer.module.scss';

const Footer = () => {
  const page = useContext(PageContext);
  const goToCover = click({ callback: page?.action.moveToDefaultPage! });

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
