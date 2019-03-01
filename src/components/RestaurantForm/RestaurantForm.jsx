import React, { Component } from "react";
import Input from "../common/Input/Input";
import TimeInput from "../common/Input/TimeInput";
import SelectInput from "../common/Input/SelectInput";
import Joi from "joi-browser";

class RestaurantForm extends Component {
  state = {
    cuisines: [],
    data: {
      name: "",
      address: "",
      openingTime: "",
      closingTime: "",
      cuisineId: "",
      averagePrice: "",
      imageUrl: ""
    },
    errors: {}
  };

  schema = {
    name: Joi.string().required(),
    address: Joi.string().required(),
    openingTime: Joi.string().required(),
    closingTime: Joi.string().required(),
    cuisineId: Joi.string().required(),
    averagePrice: Joi.number()
      .integer()
      .min(1)
      .required(),
    imageUrl: Joi.string()
      .uri()
      .required()
  };

  componentDidMount() {
    const existingId = this.props.match ? this.props.match.params.id : null;

    fetch("http://localhost:3001/cuisines")
      .then(response => response.json())
      .then(data => this.setState({ cuisines: data }))
      .catch(error => console.log("There was an error"));

    if (existingId) {
      fetch(`http://localhost:3001/restaurants/${existingId}`)
        .then(response => response.json())
        .then(data => {
          const newRestaurant = { ...data };
          newRestaurant.cuisineId = newRestaurant.cuisine._id;
          delete newRestaurant.cuisine;
          this.setState({ data: newRestaurant });
        })
        .catch(error => console.log("There was an error"));
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { cuisineId, averagePrice } = this.state.data;
    const { cuisines } = this.state;
    console.log(cuisines);
    const cuisine = cuisines.find(cuisine => cuisine._id === cuisineId);

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    let restaurant = { ...this.state.data };
    delete restaurant.cuisineId;
    restaurant.cuisine = cuisine;
    restaurant.averagePrice = parseFloat(averagePrice);

    console.log(restaurant)

    // saveRestaurant(restaurant);
    fetch("http://localhost:3001/restaurants", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(restaurant)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));

    this.props.history.replace(this.props.returnPath);
  };

  validateField = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const data = { ...this.state.data };
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, this.schema, options);
    if (!error) return null;
    const errors = error.details.reduce((acc, item) => {
      acc[item.path[0]] = item.message;
      return acc;
    }, {});
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  render() {
    const { cuisines, errors } = this.state;
    const {
      name,
      address,
      openingTime,
      closingTime,
      cuisineId,
      averagePrice,
      imageUrl
    } = this.state.data;
    const restaurantId = this.props.match.params.id;
    return (
      <div data-testid="create-page">
        <h3>{restaurantId ? "Edit Restaurant" : "New Restaurant"}</h3>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="name"
            label="Name"
            onChange={this.handleChange}
            value={name}
            error={errors.name}
          />
          <Input
            name="address"
            label="Address"
            onChange={this.handleChange}
            value={address}
            error={errors.address}
          />
          <TimeInput
            name="openingTime"
            label="Opening Time"
            onChange={this.handleChange}
            value={openingTime}
          />
          <TimeInput
            name="closingTime"
            label="Closing Time"
            onChange={this.handleChange}
            value={closingTime}
          />
          <SelectInput
            name="cuisineId"
            label="Cuisine"
            options={cuisines}
            onChange={this.handleChange}
            value={cuisineId}
            error={errors.cuisineId}
          />
          <Input
            name="averagePrice"
            label="Average Price"
            type="number"
            onChange={this.handleChange}
            value={averagePrice}
            error={errors.averagePrice}
          />
          <Input
            name="imageUrl"
            label="Image URL"
            onChange={this.handleChange}
            value={imageUrl}
            error={errors.imageUrl}
          />
          <button disabled={this.validate()} className="btn btn-primary btn-sm">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default RestaurantForm;
