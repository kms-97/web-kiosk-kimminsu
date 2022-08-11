interface props {
  width: string;
  height: string;
}

const MinusIcon = ({ width, height }: props) => {
  return (
    <svg enableBackground="new 0 0 50 50" height={height} viewBox="0 0 50 50" width={width}>
      <rect fill="none" height="50" width="50" />
      <line
        fill="none"
        stroke="#000000"
        strokeMiterlimit="10"
        strokeWidth="4"
        x1="9"
        x2="41"
        y1="25"
        y2="25"
      />
    </svg>
  );
};

export default MinusIcon;
