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
    selectedCuisine: null,
    selectedSort: "restaurantName",
    selectOptions: [{name:"Restaurant Name", value: "restaurantName"}, 
                    {name: "Average Price", value: "averagePrice"}]
  };

  handleCuisineSelect = cuisine => {
    const finalCuisine = cuisine.name === "All" ? null : cuisine;
    this.setState({
      selectedCuisine: finalCuisine
    });
  };

  handleSortSelect = event => {
    this.setState({selectedSort: event.target.value})
  }

  compareByName = (a, b) => {
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    if (aName < bName) {
        return -1;
      }
      if (aName > bName) {
        return 1;
      }
      return 0;
  }
  
  compareByPrice = (a, b) => {
    return a.averagePrice - b.averagePrice
  }

  sortByOption = (restaurants, sortOption) => {
    if(sortOption === "restaurantName"){
      return restaurants.sort(this.compareByName)
    }
    return restaurants.sort(this.compareByPrice)
  }

  render() {
    const { restaurants, cuisines, selectedCuisine, selectOptions, selectedSort } = this.state;
    const filteredRestaurantList =
      selectedCuisine && selectedCuisine._id
        ? restaurants.filter(res => res.cuisine._id === selectedCuisine._id)
        : restaurants;

    const sortedRestaurantList = this.sortByOption(filteredRestaurantList, selectedSort)    

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
            <SortBySelect handleSortSelect={this.handleSortSelect} selectedSort={this.state.selectedSort} selectOptions={selectOptions}/>
            </div>
          </div>
        </div>

        <div className="row">
          {sortedRestaurantList.map(restaurant => (
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
