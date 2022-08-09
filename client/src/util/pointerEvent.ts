import React from 'react';

const click = (threshold: number, callback: Function, arg?: any): React.PointerEventHandler => {
  return (e) => {
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
