import React from 'react';
import styles from './Img.module.scss';

interface props extends React.ComponentProps<'img'> {
  src: string;
  description: string;
}

const Img = ({ src, description, className }: props) => {
  const classString = `
    ${styles.img}
    ${className ?? ''}
  `;

  return <img src={src} alt={description} className={classString} onDragStart={() => false} />;
};

export default Img;
