import styles from './OutlineButton.module.scss';

interface props extends React.ComponentProps<'button'> {
  isActive: boolean;
  isSelected: boolean;
}

const OutlineButton = ({ isActive, isSelected, onPointerDown, className, children }: props) => {
  const classString = `
    ${styles.button}
    ${isSelected ? styles.selected : ''}
    ${isActive ? '' : styles.disabled}
    ${className ?? ''}
  `;

  return (
    <button className={classString} disabled={!isActive} onPointerDown={onPointerDown}>
      {children}
    </button>
  );
};

export default OutlineButton;
