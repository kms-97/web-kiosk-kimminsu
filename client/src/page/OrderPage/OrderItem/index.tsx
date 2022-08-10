import { FlexContainer, Img } from '../../../component';
import styles from './OrderItem.module.scss';

interface props {
  order: ORDERFOOD;
}

const OrderItem = ({ order }: props) => {
  return (
    <FlexContainer flow="column" className={styles.item}>
      <FlexContainer>
        <Img src={order.imgURL} description={order.name} className={styles.img} />
        <FlexContainer flow="column" className={styles.desc} alignItems="start" gap="20px">
          <div className={styles.name}>{order.name}</div>
          <FlexContainer justifyContent="start" gap="10px">
            <div className={styles.option}>{order.size}</div>
            <div className={styles.option}>{order.temperature}</div>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer justifyContent="spaceAround">
        <div>수량: {order.unit}</div>
        <div>합계: {(order.eachPrice * order.unit).toLocaleString()}원</div>
      </FlexContainer>
    </FlexContainer>
  );
};

export default OrderItem;
