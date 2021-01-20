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
    <div style={{ margin: 20 }}>
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
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: 10,
        }}
      >
        <p className="restaurant-name">{name}</p>
        <div className={online ? "online" : "offline"} />
      </div>
    </div>
  );
};

export default CarouselSlides;
