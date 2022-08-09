import { useContext } from 'react';
import { TransperentButton } from '../../../../component';
import { ActiveCategoryIdContext } from '../../../../context';
import { click } from '../../../../util/pointerEvent';
import styles from './CategoryTab.module.scss';

interface props {
  id: number;
  name: string;
}

const CategoryTab = ({ id, name }: props) => {
  const activeCategoryId = useContext(ActiveCategoryIdContext);
  const changeActiveCategory = click(10, activeCategoryId?.action.setState!, id);

  return (
    <TransperentButton
      key={id}
      onPointerDown={changeActiveCategory}
      isSelected={id === activeCategoryId?.state}
      className={styles.button}
    >
      <div>{name}</div>
    </TransperentButton>
  );
};

export default CategoryTab;
