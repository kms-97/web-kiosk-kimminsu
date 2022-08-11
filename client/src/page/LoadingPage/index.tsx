import { FlexContainer, Img } from 'component';
import styles from './LoadingPage.module.scss';

const LoadingPage = ({ msg }: { msg: string }) => {
  return (
    <div className="page">
      <FlexContainer className={styles.loading} flow="column" gap="30px">
        <Img
          src="https://user-images.githubusercontent.com/72490858/184129637-7aa93a82-c98c-4a72-898f-6b3ec86e0518.gif"
          description="loading"
          className={styles.logo}
        />
        <div>{msg}</div>
      </FlexContainer>
    </div>
  );
};

export default LoadingPage;
