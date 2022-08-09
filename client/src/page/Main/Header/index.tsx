import React from 'react';
import { NavContainer } from '../../../component';
import DragContainer from '../../../component/layout/DragContainer';
import CategoryTab from './CategoryTab';

interface props {
  categories: CATEGORY[];
  onClick: (id: number) => void;
  activeCategoryId: number;
}

const Header = ({ categories, onClick, activeCategoryId }: props) => {
  return (
    <header>
      <DragContainer>
        <NavContainer flow="row" wrap="nowrap">
          {categories.map(({ id, name }) => (
            <CategoryTab
              id={id}
              name={name}
              onClick={onClick}
              activeCategoryId={activeCategoryId}
            />
          ))}
        </NavContainer>
      </DragContainer>
    </header>
  );
};

export default React.memo(Header);
