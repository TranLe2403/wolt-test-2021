import React from "react";
import restaurantDB from "./discovery_page.json";
import Section from "./entities/sections";
import Carousel from "./components/Carousel";

function App() {
  const allRestaurants: Section[] = restaurantDB.sections;

  return (
    <div className="App" data-testid="restaurant-field">
      {allRestaurants.map((section) => (
        <div key={section.title}>
          <h1>{section.title}</h1>
          <Carousel restaurantArray={section.restaurants} />
        </div>
      ))}
    </div>
  );
}

export default App;
