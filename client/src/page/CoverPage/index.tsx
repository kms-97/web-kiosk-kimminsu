import { useContext, useEffect } from 'react';
import { FlexContainer, OutlineButton } from 'component';
import { OrderContext, PageContext } from 'context';
import { click } from 'util/pointerEvent';
import styles from './CoverPage.module.scss';

const CoverPage = () => {
  const page = useContext(PageContext);
  const order = useContext(OrderContext);

  useEffect(() => {
    order?.action.setState([]);
  }, []);

  const moveToCategoryPage = () => {
    page?.action.addPage('main');
  };

  const startOrder = click({ callback: moveToCategoryPage });

  return (
    <div className="page">
      <FlexContainer flow="column" className={styles.cover} justifyContent="spaceAround">
        <div className={styles.title}>KIOSK</div>
        <OutlineButton className={styles.button} onPointerDown={startOrder}>
          주문하기
        </OutlineButton>
      </FlexContainer>
    </div>
  );
};

export default CoverPage;
