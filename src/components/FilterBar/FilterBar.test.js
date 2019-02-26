import "jest-dom/extend-expect"
import FilterBar from "./FilterBar";
import { render } from "react-testing-library";
import React from "react"

test("FilterBar renders cuisines list", () => {
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

  const {getByText}= render(<FilterBar cuisines={data}/>);
  
  expect(getByText(/western/i)).toBeInTheDocument();
  expect(getByText(/japanese/i)).toBeInTheDocument()
});

test.skip("FilterBar renders selectedCuisine with className active", () => {});
