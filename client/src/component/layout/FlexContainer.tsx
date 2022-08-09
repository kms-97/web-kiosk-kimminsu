import React from 'react';
import styles from './FlexContainer.module.scss';

interface props extends React.ComponentProps<'div'>, FLEXPROPS {}

const FlexContatiner = (
  { flow, wrap, onPointerDown, children, className, align, justify, gap }: props,
  ref?: React.LegacyRef<HTMLDivElement>,
) => {
  const classString = `
    ${styles.container}
    ${styles[flow]}
    ${styles[wrap]}
    ${align ? `${styles[`align-${align}`]}` : ''}
    ${justify ? `${styles[`justify-${justify}`]}` : ''}
    ${className ?? ''}
  `;

  const style: React.CSSProperties = {
    gap: gap,
  };

  return (
    <div className={classString} style={style} onPointerDown={onPointerDown} ref={ref}>
      {children}
    </div>
  );
};

export default React.forwardRef(FlexContatiner);
