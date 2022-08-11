import React from 'react';
import { FlexContainer, OutlineButton } from 'component';
import { SIZE_STRING } from 'constant';
import { click } from 'util/pointerEvent';
import styles from './SizeOption.module.scss';

interface props {
  option: SIZE_PRICE;
  size: string | null;
  selectSize: (size: string) => void;
}

const SizeOption = ({ option, size, selectSize }: props) => {
  const Button = ({ name, addPrice }: { name: string; addPrice: number | null }) => {
    const onPointerDown = click({ callback: selectSize, arg: name });

    return (
      <OutlineButton
        isActive={addPrice === null ? false : true}
        isSelected={name === size}
        onPointerDown={onPointerDown}
        className={styles.button}
      >
        <div>{SIZE_STRING[name]}</div>
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

export default SizeOption;
