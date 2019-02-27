import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import { render } from "react-testing-library";
import React from "react";
import SortBySelect from "./SortBySelect";

const selectOptions = [
  { name: "option1", value: "option1Value" },
  { name: "option2", value: "option2Value" }
];

test("renders a select list from options", () => {
  const { getByText, getBySelectText } = render(
    <SortBySelect selectOptions={selectOptions} />
  );

  expect(getBySelectText("option1").children.length).toEqual(2);
  expect(getByText("option1")).toHaveAttribute("value", selectOptions[0].value);
  expect(getByText("option2")).toHaveAttribute("value", selectOptions[1].value);
});

test("Restaurant Name is selected by default", () => {
  const { getBySelectText } = render(
    <SortBySelect selectOptions={selectOptions} />
  );

  expect(getBySelectText("option1")).toBeInTheDocument();
});
