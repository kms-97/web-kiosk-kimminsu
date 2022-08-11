import indicator from '../../asset/indicator.gif';
import { FlexContainer, Img } from '../../component';
import styles from './LoadingPage.module.scss';

const LoadingPage = ({ msg }: { msg: string }) => {
  return (
    <div className="page">
      <FlexContainer className={styles.loading} flow="column" gap="30px">
        <Img src={indicator} description="loading" className={styles.logo} />
        <div>{msg}</div>
      </FlexContainer>
    </div>
  );
};

export default LoadingPage;
