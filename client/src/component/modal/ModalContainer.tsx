import React from 'react';
import ReactDOM from 'react-dom';
import FlexContainer from '../layout/FlexContainer';
import styles from './ModalContainer.module.scss';

interface props extends React.ComponentProps<'div'> {
  children: React.ReactElement;
}

const ModalContainer = ({ children, onPointerDown }: props) => {
  return ReactDOM.createPortal(
    <FlexContainer flow="row" wrap="nowrap" onPointerDown={onPointerDown} className={styles.modal}>
      {children}
    </FlexContainer>,
    document.getElementById('modal') as HTMLElement,
  );
};

export default ModalContainer;
