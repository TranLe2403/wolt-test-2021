import React, { useEffect, useState } from "react";

import Right from "../../images/next.svg";
import Left from "../../images/back.svg";
import Section, { Restaurant } from "../../entities/sections";
import CarouselSlides from "../CarouselSlide";
import "./index.css";

type Props = {
  sectionContent: Section;
};

export type Limit = 1 | 3 | 5;

const Carousel = ({ sectionContent }: Props): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const getNumberOfItems = (): Limit => {
    const screenSize: number = window.innerWidth;

    if (screenSize > 1280) {
      return 5;
    } else if (screenSize < 1280 && screenSize >= 768) {
      return 3;
    }
    return 1;
  };

  const [limitLength, setLimitLength] = useState<Limit>(getNumberOfItems());

  useEffect(() => {
    window.addEventListener("resize", reportWindowSize);
    return () => {
      window.removeEventListener("resize", reportWindowSize);
    };
  });

  function reportWindowSize() {
    setLimitLength(getNumberOfItems());
  }

  const goToPrevSlide = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    let indexArray = activeIndex;
    let lastIndex = sectionContent.restaurants.length - 1;

    if (indexArray < 1) {
      setActiveIndex(lastIndex);
      return;
    }
    --indexArray;

    setActiveIndex(indexArray);
  };

  const goToNextSlide = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    let indexArray = activeIndex;
    let lastIndex = sectionContent.restaurants.length - 1;

    if (indexArray === lastIndex) {
      setActiveIndex(0);
      return;
    }
    ++indexArray;

    setActiveIndex(indexArray);
  };

  const handleInfiniteCarousel = (
    restaurantArray: Restaurant[]
  ): JSX.Element[] => {
    if (restaurantArray.length < limitLength) {
      return restaurantArray.map((restaurant) => (
        <CarouselSlides restaurantItem={restaurant} key={restaurant.blurhash} />
      ));
    }

    const slicedArray = restaurantArray.slice(
      activeIndex,
      activeIndex + limitLength
    );

    if (slicedArray.length < limitLength) {
      const itemsLeft = restaurantArray.length - activeIndex;
      // get the array of items remaining which has its length less than limitLength
      const restaurantsRemainingArray = restaurantArray.slice(
        activeIndex,
        restaurantArray.length
      );
      // take exact number of items needed to fill in the set in order to have its length equal to limitLength
      const addedMoreRestaurantArray = restaurantArray.slice(
        0,
        limitLength - itemsLeft
      );

      const finalRestaurants = restaurantsRemainingArray.concat(
        addedMoreRestaurantArray
      );

      return finalRestaurants.map((restaurant) => (
        <div key={restaurant.blurhash}>
          <CarouselSlides restaurantItem={restaurant} />
        </div>
      ));
    }
    const finalRestaurants = slicedArray.map((restaurant) => (
      <div key={restaurant.blurhash}>
        <CarouselSlides restaurantItem={restaurant} />
      </div>
    ));

    return finalRestaurants;
  };

  return (
    <div className="container">
      <div className="section-container">
        <div className="title-buttons-cover">
          <h2>
            {sectionContent.title} ({sectionContent.restaurants.length})
          </h2>
          {sectionContent.restaurants.length > limitLength && (
            <div className="arrow-button-container">
              <button
                onClick={goToPrevSlide}
                className="arrow-button"
                data-testid="back-arrow"
              >
                <img src={Left} alt="Prev" style={{ width: 20 }} />
              </button>
              <button
                onClick={goToNextSlide}
                className="arrow-button"
                data-testid="next-arrow"
              >
                <img src={Right} alt="Next" style={{ width: 20 }} />
              </button>
            </div>
          )}
        </div>
        <div className="all-restaurants-container">
          <div className="all-restaurants" data-testid="test-all-restaurants">
            {handleInfiniteCarousel(sectionContent.restaurants)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
