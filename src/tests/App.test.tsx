import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

describe("<App />", () => {
  test("display 3 fields of restaurants", () => {
    const component = render(<App />);

    const getElement = component.getByTestId("restaurant-field");

    expect(getElement.childElementCount).toBe(3);
  });
});
