import "react-testing-library/cleanup-after-each";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import React from "react"
import { HomePage } from "./HomePage";
import * as RestaurantService from '../../services/restaurantService';

const data = [
  {
    _id: "5c342ac9fc13ae39f8000000",
    name: "rubbish",
    openingTime: "11:00",
    closingTime: "22:30",
    cuisine: { _id: "5c3430ecfc13ae122d000000", name: "Western" },
    imageUrl: "images/restaurants/5c342ac9fc13ae39f8000000.jpg"
  },
  {
    _id: "5c342ac9fc13ae39f8000001",
    name: "The ",
    openingTime: "12:00",
    closingTime: "21:30",
    cuisine: { _id: "5c3430ecfc13ae122d000000", name: "Western" },
    imageUrl: "images/restaurants/5c342ac9fc13ae39f8000001.jpg"
  }
];

beforeEach(() => {
  jest.spyOn(RestaurantService , "getRestaurants").mockImplementation(() => data);
})

afterEach(() => {
  RestaurantService.getRestaurants.mockRestore();
});

test("HomePage can render a list of two restaurants", () => {
  const {getAllByText} = render(<HomePage />);

  expect(RestaurantService.getRestaurants).toHaveBeenCalledTimes(1)
  expect(getAllByText("Order").length).toEqual(2)

});


