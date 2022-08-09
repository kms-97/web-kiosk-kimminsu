import React from 'react';
import styles from './TransperentButton.module.scss';

interface props extends React.ComponentProps<'button'> {
  isSelected?: boolean;
}

const TransperentButton = ({ children, isSelected, onPointerDown, className }: props) => {
  const classString = `
    ${styles.button} 
    ${isSelected ? styles.selected : ''}
    ${className ?? ''}
  `;

  return (
    <button className={classString} onPointerDown={onPointerDown}>
      {children}
    </button>
  );
};

export default TransperentButton;
