import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Carousel from "../components/Carousel/index";
import { lessThanThreeItems, restaurants } from "./dummyRestaurants";

describe("<Carousel />", () => {
  test("No arrow buttons displayed if there are less than 5 items in the list of restaurant", () => {
    const component = render(<Carousel restaurantArray={lessThanThreeItems} />);

    const getQuery = component.container.querySelector("button");

    expect(getQuery).toBe(null);
  });

  // The following tests are using restaurants array (6 items) from dummyRestaurant file
  test("5 items are displayed at the same time", () => {
    const component = render(<Carousel restaurantArray={restaurants} />);
    const allItems = component.getByTestId("test-restaurants-container");

    expect(allItems.childElementCount).toBe(5);
  });

  test("Initially, the list of restaurants which are displayed in the set of 6 items", () => {
    const component = render(<Carousel restaurantArray={restaurants} />);

    expect(component.container).toHaveTextContent(
      "restaurant founded by TranLe"
    );
    expect(component.container).toHaveTextContent("Sea Chain");
    expect(component.container).toHaveTextContent("Fake Tomato Mafia");
    expect(component.container).toHaveTextContent("Chili powder");
    expect(component.container).toHaveTextContent("Black Pepper Grill");
    expect(component.container).not.toHaveTextContent("Rosemary");
  });

  test("when clicking on Next button, the first item will disappear and the 6th one is added to the fifth position", () => {
    const component = render(<Carousel restaurantArray={restaurants} />);
    const nextButton = component.getByTestId("next-arrow");
    const allItems = component.getByTestId("test-restaurants-container");

    expect(component.container).not.toHaveTextContent("Rosemary");

    fireEvent.click(nextButton);

    const firstPositionItem = allItems.children.item(4);

    expect(firstPositionItem).toHaveTextContent("Rosemary");
    expect(component.container).not.toHaveTextContent(
      "restaurant founded by TranLe"
    );
  });

  test("when clicking on Back button, sixth item is added to the first position and fifth one will disappear", () => {
    const component = render(<Carousel restaurantArray={restaurants} />);
    const nextButton = component.getByTestId("back-arrow");
    const allItems = component.getByTestId("test-restaurants-container");

    expect(component.container).not.toHaveTextContent("Rosemary");

    fireEvent.click(nextButton);

    const firstPositionItem = allItems.children.item(0);

    expect(firstPositionItem).toHaveTextContent("Rosemary");
    expect(component.container).not.toHaveTextContent("Black Pepper Grill");
  });

  test("when double clicking on Next button, the first restaurant will be at fifth position - to the right of sixth one", () => {
    const component = render(<Carousel restaurantArray={restaurants} />);
    const allItems = component.getByTestId("test-restaurants-container");
    const getTestRestaurant = allItems.children.item(3);

    expect(getTestRestaurant).toHaveTextContent("Chili powder");

    const nextButton = component.getByTestId("next-arrow");

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(getTestRestaurant).toEqual(allItems.children.item(1));
    expect(allItems.children.item(1)).toHaveTextContent("Chili powder");
  });

  test("when double clicking on back button, the first restaurant will be at fifth position - to the right of sixth one", () => {
    const component = render(<Carousel restaurantArray={restaurants} />);
    const allItems = component.getByTestId("test-restaurants-container");
    const getFirstRestaurant = allItems.children.item(0);

    expect(getFirstRestaurant).toHaveTextContent(
      "restaurant founded by TranLe"
    );

    const backButton = component.getByTestId("back-arrow");

    fireEvent.click(backButton);
    fireEvent.click(backButton);

    expect(getFirstRestaurant).toEqual(allItems.children.item(2));
    expect(allItems.children.item(2)).toHaveTextContent(
      "restaurant founded by TranLe"
    );
    expect(allItems.children.item(1)).toHaveTextContent("Rosemary"); //This is sixth restaurant in array
  });
});
