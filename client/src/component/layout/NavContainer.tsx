import React from 'react';
import styles from './NavContainer.module.scss';

interface props extends React.ComponentProps<'nav'>, FLEXPROPS {}

const NavContainer = (
  { flow = 'row', wrap = 'nowrap', children, className }: props,
  ref?: React.LegacyRef<HTMLElement>,
) => {
  const classString = `
    ${styles.nav}
    ${styles[flow]}
    ${styles[wrap]}
    ${className ?? ''}
  `;

  return (
    <nav className={classString} ref={ref}>
      {children}
    </nav>
  );
};

export default React.forwardRef(NavContainer);
