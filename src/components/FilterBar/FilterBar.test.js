import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import { render } from "react-testing-library";
import React from "react";
import FilterBar from "./FilterBar";

const data = [
  {
    _id: "1",
    name: "Western"
  },
  {
    _id: "2",
    name: "Japanese"
  }
];

test("FilterBar renders cuisines list", () => {
  const { getByText } = render(<FilterBar cuisines={data} />);

  expect(getByText(/western/i)).toBeInTheDocument();
  expect(getByText(/japanese/i)).toBeInTheDocument();
});

test("FilterBar renders selectedCuisine with className active", () => {
  const selectedCuisine = {
    _id: "2",
    name: "Japanese"
  };
  const { getByText } = render(
    <FilterBar cuisines={data} selectedCuisineId={selectedCuisine._id} />
  );
  expect(getByText(/japanese/i)).toHaveClass("active")

});
