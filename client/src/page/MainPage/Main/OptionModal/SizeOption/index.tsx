import React, { useEffect, useState } from 'react';
import { FlexContainer, OutlineButton } from '../../../../../component';
import { click } from '../../../../../util/pointerEvent';
import styles from './SizeOption.module.scss';

interface props {
  size: SIZE;
  changeEachPrice: (arg1: number, arg2: number) => void;
}

const SizeOption = ({ size, changeEachPrice }: props) => {
  const [selectedSize, setSelectedSize] = useState<string>('small');

  useEffect(() => {
    setSelectedSize('small');
  }, [size]);

  const Button = ({ name, addPrice }: { name: string; addPrice: number | null }) => {
    const selectSize = () => {
      changeEachPrice(getPrice(selectedSize), getPrice(name));
      setSelectedSize(name);
    };

    const getPrice = (name: string) => {
      return Number(size[name]) as number;
    };

    const onPointerDown = click(10, selectSize);

    return (
      <OutlineButton
        isActive={addPrice === null ? false : true}
        isSelected={name === selectedSize}
        onPointerDown={onPointerDown}
        className={styles.button}
      >
        <div>{name}</div>
        <div>{addPrice}</div>
      </OutlineButton>
    );
  };

  return (
    <FlexContainer flow="row" wrap="nowrap" justifyContent="spaceBetween">
      {Object.entries(size).map(([name, addPrice]) => {
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
