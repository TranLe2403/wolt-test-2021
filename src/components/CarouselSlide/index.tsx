import React from "react";
import { Blurhash } from "react-blurhash";

import { Restaurant } from "../../entities/sections";
import "./index.css";

type Props = {
  restaurantItem: Restaurant;
};

const CarouselSlides = ({
  restaurantItem: { blurhash, online, name },
}: Props): JSX.Element => {
  return (
    <div className="restaurant-item">
      {!online && <div className="closed">Closed</div>}
      <div className={online ? "online-restaurant" : "offline-restaurant"}>
        <Blurhash
          hash={blurhash}
          width={200}
          height={150}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
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
