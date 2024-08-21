import React, { useRef, useState } from "react";
import Card from "./Card";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default React.memo(function CardSlider({ title, data }) {
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x;
    const childWidth = listRef.current.children[0].clientWidth;
    if (direction === "left" && sliderPosition > 0) {
        listRef.current.style.transform = `translateX(${childWidth + distance}px)`;
        setSliderPosition(sliderPosition - 1);
      }
      else 
    if (direction === "right" && sliderPosition < 4) {
        listRef.current.style.transform = `translateX(${-childWidth + distance}px)`;
        setSliderPosition(sliderPosition + 1);
      }
  };

  return (
    <div className="position-relative">
      <h2 className="py-3 fw-bold">{title}</h2>
      <div className="position-relative">
        <span className="start-0 top-0 bottom-0 h-100 display-5 position-absolute d-flex align-items-center slider-arrow">
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </span>
        <div
          className="d-flex flex-wrap gap-2"
          style={{ width: "max-content", transition: "transform 0.5s ease-in-out" }}
          ref={listRef}
        >
          {data.map((movie, ind) => {
            return <Card movie={movie} index={ind} key={ind} />;
          })}
        </div>
        <span className="end-0 top-0 bottom-0 h-100 display-5 position-absolute d-flex align-items-center slider-arrow">
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </span>
      </div>
    </div>
  );
})