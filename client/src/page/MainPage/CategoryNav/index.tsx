import React from 'react';
import { NavContainer } from 'component';
import DragContainer from 'component/layout/DragContainer';
import CategoryTab from './CategoryTab';

interface props {
  categories: CATEGORY[];
}

const CategoryNav = ({ categories }: props) => {
  return (
    <header>
      <DragContainer>
        <NavContainer flow="row" wrap="nowrap">
          {categories.map(({ id, name }) => (
            <CategoryTab id={id} name={name} />
          ))}
        </NavContainer>
      </DragContainer>
    </header>
  );
};

export default React.memo(CategoryNav);
