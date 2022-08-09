import React from 'react';
import { HeaderButton, NavContainer } from '../../../component';
import DragContainer from '../../../component/layout/DragContainer';
import styles from './Header.module.scss';

interface props {
  categories: CATEGORY[];
  onClick: (id: number) => void;
  activeCategoryId: number;
}

const Header = ({ categories, onClick, activeCategoryId }: props) => {
  const changeActiveCategory = (id: number): void => {
    return onClick(id);
  };

  return (
    <header>
      <DragContainer>
        <NavContainer flow="row" wrap="nowrap">
          {categories.map(({ id, name }) => (
            <HeaderButton
              key={id}
              onClick={() => changeActiveCategory(id)}
              value={name}
              isSelected={id === activeCategoryId}
              className={styles.button}
            />
          ))}
        </NavContainer>
      </DragContainer>
    </header>
  );
};

export default React.memo(Header);
