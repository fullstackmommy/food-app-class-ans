import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import React from "react";
import { render } from "react-testing-library";
import Restaurant from "./Restaurant";

test("Restaurant Component renders with attributes", () => {
  const data = {
    name: "The Burger Bar by Fatboy's Concepts (Boat Quay)",
    openingTime: "11:00",
    closingTime: "22:30",
    cuisine: { _id: "5c3430ecfc13ae122d000000", name: "Western" },
    imageUrl: "images/restaurants/5c342ac9fc13ae39f8000000.jpg"
  }

  const { getByText, getByAltText } = render(<Restaurant item={data}/>);

  expect(getByAltText(data.name)).toHaveAttribute(
    "src",
    data.imageUrl
  );
  expect(getByText(/The Burger Bar by Fatboy/i)).toBeInTheDocument();
  expect(getByText(/11:00.*22:30/i)).toBeInTheDocument();
  expect(getByText(/western/i)).toBeInTheDocument()
  expect(getByText("Order")).toBeInTheDocument();
});
