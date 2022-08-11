import React, { useRef, useEffect } from 'react';
import { getTranslateValues } from '../../util/transform';
import styles from './FlipContainer.module.scss';

interface props extends React.ComponentProps<'div'> {
  children: React.ReactElement;
  rightFlipEvent?: () => void;
  leftFilpEvent?: () => void;
}

const FlipContainer = ({ children, rightFlipEvent, leftFilpEvent, className }: props) => {
  const targetRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const classString = `
    ${styles.flip}
    ${className}
  `;

  useEffect(() => {
    const $target = targetRef.current;
    if ($target) {
      ($target.style as CSSStyleDeclaration).transform = `translateX(-${$target.clientWidth}px)`;
    }
  }, [children]);

  useEffect(() => {
    const $target = targetRef.current;
    if ($target) {
      $target.addEventListener('pointerdown', mouseDownHandler);
    }
  }, []);

  const flipEndHandler = ({
    $target,
    distance,
    callback,
  }: {
    $target: HTMLElement;
    distance: number;
    callback?: () => void;
  }) => {
    ($target.style as CSSStyleDeclaration).transform = `translateX(${distance}px)`;
    ($target.style as CSSStyleDeclaration).transition = `transform 0.5s`;
    ($target.style as CSSStyleDeclaration).pointerEvents = `none`;
    $target.addEventListener(
      'transitionend',
      () => {
        ($target.style as CSSStyleDeclaration).transition = `none`;
        ($target.style as CSSStyleDeclaration).pointerEvents = ``;
        if (callback) callback();
      },
      { once: true },
    );
  };

  const mouseDownHandler = (e: PointerEvent) => {
    e.preventDefault();
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
      const movementX = e.movementX;
      const { x: currentX } = getTranslateValues($target as HTMLElement);
      const limit = currentX - $container.scrollWidth + $container.clientWidth;

      const translatePosition = Math.max(Math.min(currentX + movementX, 0), limit);
      ($target.style as CSSStyleDeclaration).transform = `translateX(${translatePosition}px)`;
    }
  };

  const mouseUpHandler = (e: PointerEvent) => {
    const $target = targetRef.current;
    if ($target) {
      ($target.style as CSSStyleDeclaration).cursor = `grab`;
      targetRef.current?.removeEventListener('pointermove', mouseMoveHandler);
      targetRef.current?.removeEventListener('pointerup', mouseUpHandler);
      targetRef.current?.removeEventListener('pointerleave', mouseUpHandler);

      const { x: currentX } = getTranslateValues($target as HTMLElement);
      const leftLimit = -$target.clientWidth * 0.5;
      const rightLimit = -$target.clientWidth * 1.5;

      if (currentX > leftLimit) {
        flipEndHandler({ $target, callback: leftFilpEvent, distance: 0 });
        return;
      } else if (currentX < rightLimit) {
        flipEndHandler({ $target, callback: rightFlipEvent, distance: -($target.clientWidth * 2) });
        return;
      }

      flipEndHandler({ $target, distance: -$target.clientWidth });
    }
  };

  return (
    <div className={classString} ref={containerRef}>
      {React.cloneElement(children, {
        ref: targetRef,
      })}
    </div>
  );
};

export default FlipContainer;
