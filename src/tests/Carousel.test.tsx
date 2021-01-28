import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Carousel from "../components/Carousel/index";
import { smallListOfRestaurants, restaurants } from "./dummyRestaurants";

describe("Responsive carousel", () => {
  it("should display 1 item if screen size is less than 768px", () => {
    window = Object.assign(window, { innerWidth: 600 });
    const component = render(<Carousel sectionContent={restaurants} />);
    const allItems = component.getByTestId("test-all-restaurants");

    expect(allItems.childElementCount).toEqual(1);
  });

  it("should display 3 items if screen size is less than 1280px and more than 768px", () => {
    window = Object.assign(window, { innerWidth: 1000 });
    const component = render(<Carousel sectionContent={restaurants} />);
    const allItems = component.getByTestId("test-all-restaurants");

    expect(allItems.childElementCount).toEqual(3);
  });

  it("should display 5 items if screen size is more than 1280px", () => {
    window = Object.assign(window, { innerWidth: 1300 });
    const component = render(<Carousel sectionContent={restaurants} />);
    const allItems = component.getByTestId("test-all-restaurants");

    expect(allItems.childElementCount).toEqual(5);
  });
});

describe("Carousel", () => {
  beforeEach(() => {
    window = Object.assign(window, { innerWidth: 1290 });
  });

  it("has no arrow buttons displayed if the number of items is less than or equal limitNumber", () => {
    const component = render(
      <Carousel sectionContent={smallListOfRestaurants} />
    );
    const anyButton = component.container.querySelector("button");

    expect(anyButton).toBe(null);
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
    const lastShownRestaurant = allItems.children.item(4)
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

    for (let i = 0; i < restaurants.restaurants.length - 4; i++) {
      fireEvent.click(nextButton);
    }

    expect(firstShownRestaurant).toEqual(
      allItems.children.item(4)?.textContent as string
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
