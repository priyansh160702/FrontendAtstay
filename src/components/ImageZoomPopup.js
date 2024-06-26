import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_3 } from "../api/api";
import "../styles/ImageZoomPopup.scss";
import { useDispatch } from "react-redux";
import { setImagePopup } from "../redux/state";
import { useSwipeable } from "react-swipeable";

const ImageCarousel = ({ imageArr, imageIndex }) => {
  const imagePopup = useSelector((state) => state.imagePopup);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageArr.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageArr.length - 1 ? 0 : prevIndex + 1
    );
  };
  useEffect(() => {
    console.log("image array ", imageArr);
  }, [imageArr]);

  const handleSwipe = (direction) => {
    console.log(`Swiped ${direction}`);
    if (direction === "left") {
      goToNextSlide();
    } else if (direction === "right") {
      goToPrevSlide();
    }
  };

  // Use the useSwipeable hook to add swipe functionality
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
  });

  return (
    <div
      className="carousel-container"
      style={{ display: imagePopup ? "flex" : "none" }}
      onClick={() => dispatch(setImagePopup({ imagePopup: false }))}
    >
      <button
        className="buttonPrev"
        onClick={(e) => {
          goToPrevSlide();
          e.stopPropagation();
        }}
      >
        {"<"}
      </button>
      <div className="img-container" onClick={(e) => e.stopPropagation()} {...handlers}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "2rem",
            cursor: "pointer",
          }}
          onClick={() => dispatch(setImagePopup({ imagePopup: false }))}
          
        >
          X
        </div>
        {imageArr.length > 0 ? (
          <img
            className="img"
            src={`${API_3}${imageArr[currentIndex].replace("public", "")}`}
            alt={`image-${currentIndex}`}
          />
        ) : (
          <img src="" />
        )}
      </div>
      <button
        className="buttonNext"
        onClick={(e) => {
          goToNextSlide();
          e.stopPropagation();
        }}
      >
        {">"}
      </button>
    </div>
  );
};

export default ImageCarousel;
