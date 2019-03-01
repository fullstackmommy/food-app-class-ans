import React, { Component } from "react";
import Input from "../Input/Input";
import Select from "../Input/Select";
import { getCuisines } from '../../services/cuisineService';
import { saveRestaurant } from "../../services/restaurantService";

export class RestaurantForm extends Component {
  state = {
    cuisines : getCuisines(),
    data: {
      name: "",
      address: "",
      openingTime: "",
      closingTime: "",
      cuisine: "",
      averagePrice: 0,
      imageUrl: ""
    }
  }

  handleChange = (event) => {
    const copy = {...this.state.data}
    const type = event.target.type
    const keyName = event.target.name
    const value = event.target.value

    if(type === "number"){
      copy[keyName] = parseFloat(value)
    }else {
      copy[keyName] = value
    }
    this.setState({data: copy})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {data, cuisines} = this.state
    const copy = {...data}
    const foundCuisine = cuisines.find(cuisine => cuisine._id === copy.cuisine)
    copy.cuisine = foundCuisine
    saveRestaurant(copy);
    this.props.history.replace("/admin")
  }

  render() {
    const {cuisines} = this.state
    const {handleChange, handleSubmit} = this
    return (
      <div className="w-75 mx-auto">
        <h1>Restaurant form</h1>
        <form onSubmit={handleSubmit}>
          <Input name="Name" type="text" handleChange={handleChange}/>
          <Input name="Address" type="text" handleChange={handleChange}/>
          <Input name="Opening Time" type="text" handleChange={handleChange}/>
          <Input name="Closing Time" type="text" handleChange={handleChange}/>
          <Select name="Cuisine" options={cuisines} handleChange={handleChange} keyName="cuisine"/>
          <Input name="Average Price" type="number" handleChange={handleChange}/>
          <Input name="Image URL" type="text" handleChange={handleChange}/>
          <button className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
    );
  }
}

export default RestaurantForm;
