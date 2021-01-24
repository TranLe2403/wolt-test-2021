import React from "react";

import restaurantDB from "./discovery_page.json";
import Section from "./entities/sections";
import Carousel from "./components/Carousel";
import "./App.css";

function App() {
  const allRestaurants: Section[] = restaurantDB.sections;

  return (
    <>
      <h1 className="title">DISCOVERY APP</h1>
      <div data-testid="restaurant-fields">
        {allRestaurants.map((section) => (
          <div key={section.title}>
            <Carousel sectionContent={section} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
