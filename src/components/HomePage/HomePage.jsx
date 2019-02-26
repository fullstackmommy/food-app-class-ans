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
    selectedCuisine: getDefaultCuisine().name
  };

  handleClick= (cuisineName) => {
    this.setState({selectedCuisine : cuisineName})
  }

  render() {
    const { restaurants, cuisines, selectedCuisine } = this.state;
    const renderRestaurants = selectedCuisine === getDefaultCuisine().name ? restaurants : restaurants.filter( res => res.cuisine.name === selectedCuisine )

    return (
      <div className="container">
        <div className="row">
          <div className="col-4 mx-auto mt-3">
            <FilterBar cuisines={cuisines} handleClick={this.handleClick}/>
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
