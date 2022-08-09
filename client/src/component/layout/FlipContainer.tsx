import React, { useRef, useEffect } from 'react';
import { getTranslateValues } from '../../util/transform';
import styles from './FlipContainer.module.scss';

interface props {
  children: React.ReactElement;
  direction: 'x' | 'y';
  rightFlipEvent?: () => void;
  leftFilpEvent?: () => void;
}

const FlipContainer = ({ children, direction, rightFlipEvent, leftFilpEvent }: props) => {
  const targetRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $target = targetRef.current;
    if ($target) {
      ($target.style as CSSStyleDeclaration).transform = `translateX(-${$target.clientWidth}px)`;
      $target.addEventListener('pointerdown', mouseDownHandler);
    }
  }, []);

  const mouseDownHandler = (e: PointerEvent) => {
    const $target = targetRef.current;
    if ($target) {
      ($target.style as CSSStyleDeclaration).cursor = `grabbing`;
      targetRef.current?.addEventListener('pointermove', mouseMoveHandler);
      targetRef.current?.addEventListener('pointerup', mouseUpHandler);
      targetRef.current?.addEventListener('pointerleave', mouseUpHandler);
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
    }
  };

  const mouseUpHandler = (e: PointerEvent) => {
    const $target = targetRef.current;
    if ($target) {
      ($target.style as CSSStyleDeclaration).cursor = `grab`;
      targetRef.current?.removeEventListener('pointermove', mouseMoveHandler);
      targetRef.current?.removeEventListener('pointerup', mouseUpHandler);
      targetRef.current?.removeEventListener('pointerleave', mouseUpHandler);

      if (direction === 'x') {
        const { x: currentX } = getTranslateValues($target as HTMLElement);
        const leftLimit = -$target.clientWidth * 0.5;
        const rightLimit = -$target.clientWidth * 1.5;

        if (currentX > leftLimit) {
          if (leftFilpEvent) leftFilpEvent();
        } else if (currentX < rightLimit) {
          if (rightFlipEvent) rightFlipEvent();
        }
        ($target.style as CSSStyleDeclaration).transform = `translateX(-${$target.clientWidth}px)`;
      }
    }
  };

  return (
    <div className={styles.flip} ref={containerRef}>
      {React.cloneElement(children, {
        ref: targetRef,
      })}
    </div>
  );
};

export default FlipContainer;
