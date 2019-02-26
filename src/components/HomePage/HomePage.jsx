import React, { Component } from "react";
import { getRestaurants } from "../../services/restaurantService";
import { getCuisines, getDefaultCuisine } from "../../services/cuisineService";
import Restaurant from "../Restaurant/Restaurant";
import FilterBar from "../FilterBar/FilterBar";
import SortBySelect from "../SortBySelect/SortBySelect";
import "./HomePage.scss";

class HomePage extends Component {
  state = {
    restaurants: getRestaurants(),
    cuisines: [getDefaultCuisine(), ...getCuisines()],
    selectedCuisine: null
  };

  handleCuisineSelect = cuisine => {
    const finalCuisine = cuisine.name === "All" ? null : cuisine;
    this.setState({
      selectedCuisine: finalCuisine
    });
  };

  render() {
    const { restaurants, cuisines, selectedCuisine } = this.state;
    const filteredRestaurantList =
      selectedCuisine && selectedCuisine._id
        ? restaurants.filter(res => res.cuisine._id === selectedCuisine._id)
        : restaurants;

    return (
      <div className="container">
        <div className="row justify-content-between align-items-center mt-3">
          <div className="col-md-6">
            <FilterBar
              cuisines={cuisines}
              selected={selectedCuisine}
              handleClick={this.handleCuisineSelect}
            />
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-end">
            <SortBySelect />
            </div>
          </div>
        </div>

        <div className="row">
          {filteredRestaurantList.map(restaurant => (
            <div className="card-col" key={restaurant._id}>
              <Restaurant details={restaurant} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default HomePage;
