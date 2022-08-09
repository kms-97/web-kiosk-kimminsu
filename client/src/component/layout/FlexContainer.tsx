import React from 'react';
import styles from './FlexContainer.module.scss';

interface props extends React.ComponentProps<'div'>, FLEXPROPS {}

const FlexContatiner = (
  {
    flow,
    wrap,
    onPointerDown,
    children,
    className,
    alignItems,
    alignContent,
    justifyContent,
    gap,
  }: props,
  ref?: React.LegacyRef<HTMLDivElement>,
) => {
  const classString = `
    ${styles.container}
    ${styles[flow]}
    ${styles[wrap]}
    ${alignItems ? `${styles[`alignItem-${alignItems}`]}` : ''}
    ${alignContent ? `${styles[`alignContent-${alignContent}`]}` : ''}
    ${justifyContent ? `${styles[`justifyContent-${justifyContent}`]}` : ''}
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
