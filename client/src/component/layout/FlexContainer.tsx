import React from 'react';
import styles from './FlexContainer.module.scss';

interface props extends React.ComponentProps<'div'>, FLEXPROPS {}

const FlexContatiner = (
  { flow, wrap, onClick, children, className, align }: props,
  ref?: React.LegacyRef<HTMLDivElement>,
) => {
  const classString = `
    ${styles.container}
    ${styles[flow]}
    ${styles[wrap]}
    ${align ? `${styles[`align-${align}`]}` : ''}
    ${className ?? ''}
  `;

  return (
    <div className={classString} onClick={onClick} ref={ref}>
      {children}
    </div>
  );
};

export default React.forwardRef(FlexContatiner);
