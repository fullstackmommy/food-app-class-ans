import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import React from "react";
import { render, fireEvent} from "react-testing-library";
import RestaurantForm from "./RestaurantForm";

test("displays all form fields on load", () => {

  const match= {params: {id: 1}}
  const returnPath = "/admin"
  const { getByLabelText } = render(<RestaurantForm match={match} returnPath={returnPath}/>);

  expect(getByLabelText("Name")).toHaveAttribute("type", "text");
  expect(getByLabelText("Address")).toHaveAttribute("type", "text");
  expect(getByLabelText("Opening Time")).toHaveAttribute("type", "text");
  expect(getByLabelText("Closing Time")).toHaveAttribute("type", "text");
  expect(getByLabelText("Cuisine")).toBeInTheDocument()
  expect(getByLabelText("Average Price")).toHaveAttribute("type", "number");
  expect(getByLabelText("Image URL")).toHaveAttribute("type", "text");
});

const match= {params: {id: 1}}
const returnPath = "/admin"

test("Save button us disabled on page load", () => {
  const { getByText } = render(<RestaurantForm match={match} returnPath={returnPath}/>);
  expect(getByText("Save")).toHaveAttribute("disabled");
})

test("There is no error message on page load", () => {
  const { queryByText } = render(<RestaurantForm match={match} returnPath={returnPath}/>);
  
  expect(queryByText(/is not allowed to be empty/i)).not.toBeInTheDocument()
})

test("error message appears if text input is invalid, and is removed if valid", () =>{
  const { getByText, getByLabelText, queryByText } = render(<RestaurantForm match={match} returnPath={returnPath}/>);
  const nameInput = getByLabelText("Name")
  
  fireEvent.change(nameInput, { target: { value: "a" } });
  fireEvent.change(nameInput, { target: { value: "" } });
  expect(getByText('"name" is not allowed to be empty')).toBeInTheDocument()
  
  fireEvent.change(nameInput, { target: { value: "a" } });
  expect(queryByText('"name" is not allowed to be empty')).not.toBeInTheDocument()

}) 

test("error message appears if number input is invalid", () => {
  const { getByText, getByLabelText, queryByText } = render(<RestaurantForm match={match} returnPath={returnPath}/>);
  const priceInput = getByLabelText("Average Price")
  
  fireEvent.change(priceInput, { target: { value: "0" } });
  expect(getByText('"averagePrice" must be larger than or equal to 1')).toBeInTheDocument()
  
  fireEvent.change(priceInput, { target: { value: "1" } });
  expect(queryByText('"averagePrice" must be larger than or equal to 1')).not.toBeInTheDocument()
})


