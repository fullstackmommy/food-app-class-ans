import React, { Component } from "react";
import { getDefaultCuisine } from "../../services/cuisineService";
import Restaurant from "../Restaurant/Restaurant";
import FilterBar from "../FilterBar/FilterBar";
import SortBySelect from "../SortBySelect/SortBySelect";
import "./HomePage.scss";

class HomePage extends Component {
  state = {
    restaurants: [],
    cuisines: [],
    selectedCuisine: null,
    sortByOptions: [
      { name: "Restaurant Name", value: "name" },
      { name: "Average Price", value: "averagePrice" }
    ],
    selectedSortBy: "name"
  };

  componentDidMount() {
    fetch("http://localhost:3001/cuisines")
      .then(response => response.json())
      .then(data => this.setState({ cuisines: [getDefaultCuisine(), ...data] }))
      .catch(error => console.log("There was an error"));

    fetch("http://localhost:3001/restaurants")
      .then(response => response.json())
      .then(data => this.setState({ restaurants: data }))
      .catch(error => console.log("There was an error"));
  }

  handleCuisineSelect = cuisine => {
    const finalCuisine = cuisine.name === "All" ? null : cuisine;
    this.setState({
      selectedCuisine: finalCuisine
    });
  };

  handleSortSelect = event => {
    const selectedOption = event.target.value;
    this.setState({ selectedSortBy: selectedOption });
  };

  filterAndSortRestaurantList = () => {
    const { restaurants, selectedCuisine, selectedSortBy } = this.state;

    let filteredByCuisine =
      selectedCuisine && selectedCuisine._id
        ? restaurants.filter(res => res.cuisine._id === selectedCuisine._id)
        : restaurants;

    return filteredByCuisine.sort((first, second) => {
      if (first[selectedSortBy] < second[selectedSortBy]) return -1;
      if (first[selectedSortBy] > second[selectedSortBy]) return 1;
      return 0;
    });
  };

  render() {
    const {
      cuisines,
      selectedCuisine,
      sortByOptions,
      selectedSortBy
    } = this.state;
    const filteredRestaurantList = this.filterAndSortRestaurantList();

    return (
      <div data-testid="home-page">
        <div className="row">
          <div className="col-auto mr-auto">
            <FilterBar
              cuisines={cuisines}
              selected={selectedCuisine}
              handleClick={this.handleCuisineSelect}
            />
          </div>

          <div className="col-auto mt-3">
            <SortBySelect
              options={sortByOptions}
              selected={selectedSortBy}
              handleSelect={this.handleSortSelect}
            />
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
