import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Carousel, { limitLength } from "../components/Carousel/index";
import { smallListOfRestaurants, restaurants } from "./dummyRestaurants";

describe("Carousel", () => {
  it("has no arrow buttons displayed if the number of items is less than or equal limitNumber", () => {
    const component = render(
      <Carousel sectionContent={smallListOfRestaurants} />
    );
    const anyButton = component.container.querySelector("button");

    expect(anyButton).toBe(null);
  });

  it("renders exactly maximum number of allowed items displayed at the same time", () => {
    const component = render(<Carousel sectionContent={restaurants} />);
    const allItems = component.getByTestId("test-all-restaurants");

    expect(allItems.childElementCount).toBe(limitLength);
  });

  test("when clicking on Next button, the first item will disappear and the second item will be shown as the first position", () => {
    const component = render(<Carousel sectionContent={restaurants} />);
    const nextButton = component.getByTestId("next-arrow");
    const allItems = component.getByTestId("test-all-restaurants");

    const firstShownRestaurant = allItems.children.item(0)
      ?.textContent as string;

    const secondShownRestaurant = allItems.children.item(1)
      ?.textContent as string;

    fireEvent.click(nextButton);

    expect(secondShownRestaurant).toEqual(
      allItems.children.item(0)?.textContent as string
    );
    expect(component.container).not.toHaveTextContent(firstShownRestaurant);
  });

  test("when clicking on Back button, the first item is moved to the second position and the last one will disappear", () => {
    const component = render(<Carousel sectionContent={restaurants} />);
    const backButton = component.getByTestId("back-arrow");
    const allItems = component.getByTestId("test-all-restaurants");

    const firstShownRestaurant = allItems.children.item(0)
      ?.textContent as string;
    const lastShownRestaurant = allItems.children.item(limitLength - 1)
      ?.textContent as string;

    fireEvent.click(backButton);

    expect(firstShownRestaurant).toEqual(
      allItems.children.item(1)?.textContent as string
    );
    expect(component.container).not.toHaveTextContent(lastShownRestaurant);
  });

  test("For infinite carousel, the first restaurant will be shown again after passing all items of set by continuously clicking on Next button", () => {
    const component = render(<Carousel sectionContent={restaurants} />);
    const allItems = component.getByTestId("test-all-restaurants");
    const nextButton = component.getByTestId("next-arrow");

    const firstShownRestaurant = allItems.children.item(0)
      ?.textContent as string;

    for (let i = 0; i < restaurants.restaurants.length - limitLength + 1; i++) {
      fireEvent.click(nextButton);
    }

    expect(firstShownRestaurant).toEqual(
      allItems.children.item(limitLength - 1)?.textContent as string
    );
  });

  test("For infinite carousel, the first restaurant will be shown at initial its position after passing all items of set by continuously clicking on Back button", () => {
    const component = render(<Carousel sectionContent={restaurants} />);
    const allItems = component.getByTestId("test-all-restaurants");
    const backButton = component.getByTestId("back-arrow");

    const firstShownRestaurant = allItems.children.item(0)
      ?.textContent as string;

    for (let i = 0; i < restaurants.restaurants.length; i++) {
      fireEvent.click(backButton);
    }

    expect(firstShownRestaurant).toEqual(
      allItems.children.item(0)?.textContent as string
    );
  });
});
