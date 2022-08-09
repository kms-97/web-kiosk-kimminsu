import React from 'react';
import { FlexContainer, OutlineButton } from '../../../../../component';
import { click } from '../../../../../util/pointerEvent';
import styles from './TemperatureOption.module.scss';

interface props {
  option: TEMPERATURE;
  temperature: string;
  selectTemperature: (temp: string) => void;
}

const TemperatureOption = ({ option, temperature, selectTemperature }: props) => {
  const Button = ({ name, addPrice }: { name: string; addPrice: number | null }) => {
    const onPointerDown = click(10, selectTemperature, name);

    return (
      <OutlineButton
        isActive={addPrice === null ? false : true}
        isSelected={name === temperature}
        onPointerDown={onPointerDown}
        className={styles.button}
      >
        <div>{name}</div>
        <div>+{addPrice}</div>
      </OutlineButton>
    );
  };

  return (
    <FlexContainer flow="row" wrap="nowrap" justifyContent="spaceBetween">
      {Object.entries(option).map(([name, addPrice]) => {
        if (name !== 'id') {
          return <Button key={name} name={name} addPrice={addPrice} />;
        } else {
          return <React.Fragment key={name}></React.Fragment>;
        }
      })}
    </FlexContainer>
  );
};

export default TemperatureOption;
