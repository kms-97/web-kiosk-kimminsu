import { TransperentButton } from '../../../../component';
import { click } from '../../../../util/pointerEvent';
import styles from './CategoryTab.module.scss';

interface props {
  id: number;
  name: string;
  activeCategoryId: number;
  onClick: (id: number) => void;
}

const CategoryTab = ({ id, name, activeCategoryId, onClick }: props) => {
  const changeActiveCategory = click(10, onClick, id);

  return (
    <TransperentButton
      key={id}
      onPointerDown={changeActiveCategory}
      isSelected={id === activeCategoryId}
      className={styles.button}
    >
      <div>{name}</div>
    </TransperentButton>
  );
};

export default CategoryTab;
