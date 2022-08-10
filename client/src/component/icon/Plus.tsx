interface props {
  width: string;
  height: string;
}

const PlusIcon = ({ width, height }: props) => {
  return (
    <svg enableBackground="new 0 0 50 50" height={height} viewBox="0 0 50 50" width={width}>
      <rect fill="none" height="16" width="16" />
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
      <line
        fill="none"
        stroke="#000000"
        strokeMiterlimit="10"
        strokeWidth="4"
        x1="25"
        x2="25"
        y1="9"
        y2="41"
      />
    </svg>
  );
};

export default PlusIcon;
