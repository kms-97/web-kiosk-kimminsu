import { FlexContainer, CircleButton } from '../../../../component';
import { click } from '../../../../util/pointerEvent';
import styles from './UnitOption.module.scss';

interface props {
  unit: number;
  increaseUnit: () => void;
  decreaseUnit: () => void;
}

const UnitOption = ({ unit, increaseUnit, decreaseUnit }: props) => {
  const onClickIncreaseButton = click({ callback: increaseUnit });
  const onClickDecreaseButton = click({ callback: decreaseUnit });
  return (
    <FlexContainer flow="row" wrap="nowrap" gap="10px">
      <CircleButton
        isActive={!(unit === 1)}
        onPointerDown={onClickDecreaseButton}
        className={styles.button}
      >
        <div>-</div>
      </CircleButton>
      <div className={styles.unit}>{unit}</div>
      <CircleButton isActive={true} onPointerDown={onClickIncreaseButton} className={styles.button}>
        <div>+</div>
      </CircleButton>
    </FlexContainer>
  );
};

export default UnitOption;
