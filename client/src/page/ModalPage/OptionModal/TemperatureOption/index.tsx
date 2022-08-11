import React from 'react';
import { FlexContainer, OutlineButton } from 'component';
import { TEMP_STRING } from 'constant';
import { click } from 'util/pointerEvent';
import styles from './TemperatureOption.module.scss';

interface props {
  option: TEMPERATURE_PRICE;
  temperature: string | null;
  selectTemperature: (temp: string) => void;
}

const TemperatureOption = ({ option, temperature, selectTemperature }: props) => {
  const Button = ({ name, addPrice }: { name: string; addPrice: number | null }) => {
    const onPointerDown = click({ callback: selectTemperature, arg: name });

    return (
      <OutlineButton
        isActive={addPrice === null ? false : true}
        isSelected={name === temperature}
        onPointerDown={onPointerDown}
        className={styles.button}
      >
        <div>{TEMP_STRING[name]}</div>
        {addPrice ? <div>+{addPrice}</div> : null}
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
