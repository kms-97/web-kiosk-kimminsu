import React from 'react';

interface props {
  threshold?: number;
  callback: Function;
  arg?: any;
  exact?: boolean;
}

const click = ({
  callback,
  threshold = 10,
  arg,
  exact = false,
}: props): React.PointerEventHandler => {
  return (e) => {
    if (exact && e.target !== e.currentTarget) return;
    const $target = e.currentTarget as HTMLElement;
    const [startX, startY] = [e.pageX, e.pageY];

    function pointerUpEvent(e: PointerEvent) {
      const [endX, endY] = [e.pageX, e.pageY];
      const distance = ((startX - endX) ** 2 + (startY - endY) ** 2) * 0.5;

      if (distance < threshold) callback(arg);
      $target.removeEventListener('pointerup', pointerUpEvent);
    }

    function pointerLeaveEvent(e: PointerEvent) {
      $target.removeEventListener('pointerup', pointerUpEvent);
      $target.removeEventListener('pointerleave', pointerLeaveEvent);
    }

    $target.addEventListener('pointerup', pointerUpEvent);
    $target.addEventListener('pointerleave', pointerLeaveEvent);
  };
};

export { click };
