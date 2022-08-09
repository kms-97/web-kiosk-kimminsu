export function getTranslateValues(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const matrix = style.transform;

  // No transform property. Simply return 0 values.
  if (matrix === 'none') {
    return {
      x: 0,
      y: 0,
      z: 0,
    };
  }

  // Can either be 2d or 3d transform
  const matrixType = matrix.includes('3d') ? '3d' : '2d';
  const matrixValues = (matrix.match(/matrix.*\((.+)\)/) as string[])[1].split(', ').map(Number);

  // 2d matrices have 6 values
  // Last 2 values are X and Y.
  // 2d matrices does not have Z value.
  if (matrixType === '2d') {
    return {
      x: matrixValues[4],
      y: matrixValues[5],
      z: 0,
    };
  }

  // 3d matrices have 16 values
  // The 13th, 14th, and 15th values are X, Y, and Z
  return {
    x: matrixValues[12],
    y: matrixValues[13],
    z: matrixValues[14],
  };
}
