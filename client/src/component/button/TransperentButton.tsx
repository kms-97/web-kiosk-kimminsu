import React from 'react';
import styles from './TransperentButton.module.scss';

interface props extends React.ComponentProps<'button'> {
  isSelected?: boolean;
  isActive?: boolean;
}

const TransperentButton = ({
  children,
  isActive = true,
  isSelected,
  onPointerDown,
  className,
}: props) => {
  const classString = `
    ${styles.button} 
    ${isSelected ? styles.selected : ''}
    ${className ?? ''}
  `;

  return (
    <button className={classString} disabled={!isActive} onPointerDown={onPointerDown}>
      {children}
    </button>
  );
};

export default TransperentButton;
