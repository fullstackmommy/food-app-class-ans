import React, { Component } from "react";
import { getRestaurants } from "../../services/restaurantService";
import Restaurant from "../Restaurant/Restaurant";
import "./HomePage.scss";
import FilterBar from "../FilterBar/FilterBar";

class HomePage extends Component {
  state = {
    restaurants: getRestaurants()
  };
  render() {
    const { restaurants } = this.state;
    return (
      <div className="container">
        <div className="">
          <div className="">
            <FilterBar />
          </div>
        </div>
        <div className="row">
          {restaurants.map(restaurant => (
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
