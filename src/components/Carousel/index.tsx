import React, { useState } from "react";

import Right from "../../images/next.svg";
import Left from "../../images/back.svg";
import { Restaurant } from "../../entities/sections";
import CarouselSlides from "./CarouselSlides";
import "./index.css";

type Props = {
  restaurantArray: Restaurant[];
};

const Carousel = (props: Props): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevSlide = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    let index = activeIndex;
    let slidesLength = props.restaurantArray.length;

    if (index < 1) {
      index = slidesLength;
    }
    --index;
    setActiveIndex(index);
  };

  const goToNextSlide = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let index = activeIndex;
    let slidesLength = props.restaurantArray.length - 1;
    if (index === slidesLength) {
      index = -1;
    }
    ++index;
    setActiveIndex(index);
  };

  const handleInfiniteCarousel = (
    restaurantArray: Restaurant[]
  ): JSX.Element[] => {
    const slicedArray = restaurantArray.slice(activeIndex, activeIndex + 5);

    if (slicedArray.length < 5) {
      const itemsLeft = restaurantArray.length - activeIndex;
      const restaurantsRemainingArray = restaurantArray.slice(
        activeIndex,
        restaurantArray.length
      );
      const addedMoreRestaurantArray = restaurantArray.slice(0, 5 - itemsLeft);

      let newArray = restaurantsRemainingArray.concat(addedMoreRestaurantArray);

      return newArray.map((restaurant) => (
        <div key={restaurant.blurhash}>
          <CarouselSlides restaurantSlide={restaurant} />
        </div>
      ));
    }
    const showData = slicedArray.map((restaurant) => (
      <div key={restaurant.blurhash}>
        <CarouselSlides restaurantSlide={restaurant} />
      </div>
    ));

    return showData;
  };

  if (props.restaurantArray.length < 5) {
    return (
      <div className="grid-container">
        <div className="restaurant-grids">
          {props.restaurantArray.map((restaurant) => (
            <CarouselSlides
              restaurantSlide={restaurant}
              key={restaurant.blurhash}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <div className="fields-cover">
        <div className="buttons-cover">
          <div className="arrow-button-container">
            <button
              onClick={goToPrevSlide}
              className="arrow-button"
              data-testid="back-arrow"
            >
              <img src={Left} alt="Prev" style={{ width: 20 }} />
            </button>
            <button onClick={goToNextSlide} className="arrow-button">
              <img
                src={Right}
                alt="Next"
                style={{ width: 20 }}
                data-testid="next-arrow"
              />
            </button>
          </div>
        </div>
        <div className="grid-container">
          <div
            className="restaurant-grids"
            data-testid="test-restaurants-container"
          >
            {handleInfiniteCarousel(props.restaurantArray)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
