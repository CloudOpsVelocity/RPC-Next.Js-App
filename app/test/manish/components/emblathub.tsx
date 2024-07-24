import React from "react";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  img: string;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, img } = props;

  return (
    <div
      className={"embla-thumbs__slide ml-5".concat(
        selected
          ? " embla-thumbs__slide--selected  border-solid border-2 border-black"
          : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <img src={img} alt="" />
      </button>
    </div>
  );
};
