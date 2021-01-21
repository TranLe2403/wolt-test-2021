import React from "react";
import { Restaurant } from "../../entities/sections";
import { Blurhash } from "react-blurhash";

import "./CarouselSlides.css";
type Props = {
  restaurantSlide: Restaurant;
};

const CarouselSlides = (props: Props): JSX.Element => {
  const { blurhash, online, name } = props.restaurantSlide;
  return (
    <div className="restaurant-item">
      <Blurhash
        hash={blurhash}
        width={200}
        height={150}
        resolutionX={32}
        resolutionY={32}
        punch={1}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 10,
        }}
      >
        <div className="restaurant-name">{name}</div>
        <div className={online ? "online" : "offline"} />
      </div>
    </div>
  );
};

export default CarouselSlides;
