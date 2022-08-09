import React, { useRef, useEffect } from 'react';
import { getTranslateValues } from '../../util/transform';
import styles from './DragContainer.module.scss';

interface props {
  children: React.ReactElement;
  direction?: 'x' | 'y';
}

const DragContainer = ({ children, direction = 'x' }: props) => {
  const targetRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    targetRef.current?.addEventListener('pointerdown', mouseDownHandler);
  }, []);

  useEffect(() => {
    (targetRef.current?.style as CSSStyleDeclaration).transform = `none`;
  }, [children]);

  const mouseDownHandler = (e: PointerEvent) => {
    const $target = targetRef.current;
    if ($target) {
      ($target.style as CSSStyleDeclaration).cursor = `grabbing`;
      $target.addEventListener('pointermove', mouseMoveHandler);
      $target.addEventListener('pointerup', mouseUpHandler);
      $target.addEventListener('pointerleave', mouseUpHandler);
    }
  };

  const mouseMoveHandler = (e: PointerEvent) => {
    const $target = targetRef.current;
    const $container = containerRef.current;

    if ($target && $container) {
      if (direction === 'x') {
        const movementX = e.movementX;
        const { x: currentX } = getTranslateValues($target as HTMLElement);
        const limit = currentX - $container.scrollWidth + $container.clientWidth;

        const translatePosition = Math.max(Math.min(currentX + movementX, 0), limit);
        ($target.style as CSSStyleDeclaration).transform = `translateX(${translatePosition}px)`;
      }
      if (direction === 'y') {
        const movementY = e.movementY;
        const { y: currentY } = getTranslateValues($target as HTMLElement);
        const limit = currentY - $container.scrollHeight + $container.clientHeight;

        const translatePosition = Math.max(Math.min(currentY + movementY, 0), limit);
        ($target.style as CSSStyleDeclaration).transform = `translateY(${translatePosition}px)`;
      }
    }
  };

  const mouseUpHandler = (e: PointerEvent) => {
    const $target = targetRef.current;
    if ($target) {
      ($target.style as CSSStyleDeclaration).cursor = `grab`;
      targetRef.current?.removeEventListener('pointermove', mouseMoveHandler);
      targetRef.current?.removeEventListener('pointerup', mouseUpHandler);
    }
  };

  return (
    <div className={styles.drag} ref={containerRef}>
      {React.cloneElement(children, {
        ref: targetRef,
      })}
    </div>
  );
};

export default DragContainer;
