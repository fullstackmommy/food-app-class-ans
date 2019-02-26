import React, { Component } from "react";
import { getRestaurants } from "../../services/restaurantService";
import { getCuisines, getDefaultCuisine } from "../../services/cuisineService";
import Restaurant from "../Restaurant/Restaurant";
import FilterBar from "../FilterBar/FilterBar";
import "./HomePage.scss";

class HomePage extends Component {
  state = {
    restaurants: getRestaurants(),
    cuisines: [getDefaultCuisine(), ...getCuisines()],
    selectedCuisineId: getDefaultCuisine()._id
  };

  handleClick= (cuisine) => {
    this.setState({selectedCuisineId : cuisine._id})
  }

  render() {
    const { restaurants, cuisines, selectedCuisineId } = this.state;
    const renderRestaurants = selectedCuisineId === getDefaultCuisine()._id ? restaurants : restaurants.filter( res => res.cuisine._id === selectedCuisineId )

    return (
      <div className="container">
        <div className="row">
          <div className="col-4 mx-auto mt-3">
            <FilterBar cuisines={cuisines} handleClick={this.handleClick} selectedCuisineId={selectedCuisineId} />
          </div>
        </div>
        <div className="row">
          {renderRestaurants.map(restaurant => (
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
