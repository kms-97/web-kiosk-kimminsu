import styles from './OptionButton.module.scss';

interface props extends React.ComponentProps<'button'> {
  isActive: boolean;
  isSelected: boolean;
  name: string;
  price: number | null;
}

const OptionButton = ({ isActive, isSelected, name, price, onClick, className }: props) => {
  const classString = `
    ${styles.button}
    ${isSelected ? styles.selected : ''}
    ${className ?? ''}
  `;

  return (
    <button className={classString} disabled={!isActive} onClick={onClick}>
      <div>{name}</div>
      <div>{price} 원</div>
    </button>
  );
};

export default OptionButton;
