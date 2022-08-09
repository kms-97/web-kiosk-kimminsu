import React, { useEffect, useState } from 'react';
import { FlexContainer, OutlineButton } from '../../../../../component';
import { click } from '../../../../../util/pointerEvent';
import styles from './TemperatureOption.module.scss';

interface props {
  temperature: TEMPERATURE;
  changeEachPrice: (arg1: number, arg2: number) => void;
}

const TemperatureOption = ({ temperature, changeEachPrice }: props) => {
  const [selectedTemperature, setSelectedTemperature] = useState<string>('hot');

  useEffect(() => {
    setSelectedTemperature('hot');
  }, [temperature]);

  const Button = ({ name, addPrice }: { name: string; addPrice: number | null }) => {
    const selectTemperature = () => {
      changeEachPrice(getPrice(selectedTemperature), getPrice(name));
      setSelectedTemperature(name);
    };

    const getPrice = (name: string) => {
      return Number(temperature[name]) as number;
    };

    const onPointerDown = click(10, selectTemperature);

    return (
      <OutlineButton
        isActive={addPrice === null ? false : true}
        isSelected={name === selectedTemperature}
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
      {Object.entries(temperature).map(([name, addPrice]) => {
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
