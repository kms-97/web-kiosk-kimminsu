import React from 'react';
import styles from './HeaderButton.module.scss';

interface props extends React.ComponentProps<'button'> {
  isSelected: boolean;
}

const HeaderButton = ({ value, id, isSelected, onPointerDown, className }: props) => {
  const classString = `
    ${styles.button} 
    ${isSelected ? styles.selected : ''}
    ${className ?? ''}
  `;

  return (
    <button className={classString} id={id} onPointerDown={onPointerDown}>
      {value}
    </button>
  );
};

export default HeaderButton;
