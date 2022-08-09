import styles from './OptionButton.module.scss';

interface props extends React.ComponentProps<'button'> {
  isActive: boolean;
  isSelected: boolean;
}

const OptionButton = ({ isActive, isSelected, onPointerDown, className, children }: props) => {
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

export default OptionButton;
