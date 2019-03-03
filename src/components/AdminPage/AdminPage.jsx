import React, { Component } from "react";
import { Link } from "react-router-dom";
import RestaurantTable from "../RestaurantTable/RestaurantTable";
import { getRestaurants } from "../../services/restaurantService";

class AdminPage extends Component {
  state = {
    restaurants: []
  };

  fetchRestaurants = () => {
    fetch("http://localhost:3001/restaurants")
      .then(response => response.json())
      .then(data => this.setState({ restaurants: data }))
      .catch(error => console.log("There was an error"));
  };

  componentDidMount() {
    this.fetchRestaurants();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.restaurants.length !== this.state.restaurants.length) {
      this.fetchRestaurants();
    }
  }

  handleDelete = restaurantId => {
    // deleteRestaurant(restaurantId);
    fetch(`http://localhost:3001/restaurants/${restaurantId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));

    this.setState({ restaurants: getRestaurants() });
  };

  render() {
    const { restaurants } = this.state;
    return (
      <div data-testid="admin-page">
        <div className="row justify-content-end">
          <Link className="btn btn-primary btn-sm mb-2" to="/restaurants/new">
            Create New
          </Link>
        </div>
        <div className="row">
          <RestaurantTable
            restaurants={restaurants}
            handleDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

export default AdminPage;
