import { useContext, useEffect } from 'react';
import { BeansIcon, FlexContainer, OutlineButton } from 'component';
import { OrderContext } from 'context';
import { click } from 'util/pointerEvent';
import styles from './CoverPage.module.scss';

interface props extends PAGE_PROPS {}

const CoverPage = ({ setPage }: props) => {
  const order = useContext(OrderContext);

  useEffect(() => {
    order?.action.setState([]);
  }, []);

  const moveToCategoryPage = () => {
    setPage('main');
  };

  const startOrder = click({ callback: moveToCategoryPage });

  return (
    <div className="page" onPointerDown={startOrder}>
      <FlexContainer flow="column" className={styles.cover} justifyContent="spaceAround">
        <div className={styles.title}>Cafe In</div>
        <OutlineButton className={styles.button}>터치하여 주문하기</OutlineButton>
        <BeansIcon className={styles.icon} width="180px" height="180px"></BeansIcon>
      </FlexContainer>
    </div>
  );
};

export default CoverPage;
