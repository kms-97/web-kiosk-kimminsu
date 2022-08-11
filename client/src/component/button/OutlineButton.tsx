import styles from './OutlineButton.module.scss';

interface props extends React.ComponentProps<'button'> {
  isActive?: boolean;
  isSelected?: boolean;
}

const OutlineButton = ({
  isActive = true,
  isSelected = false,
  onPointerDown,
  className,
  children,
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

export default OutlineButton;
