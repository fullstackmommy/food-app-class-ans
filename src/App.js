import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import OrderPage from "./components/OrderPage/OrderPage";
import AdminPage from "./components/AdminPage/AdminPage";
import { RestaurantForm } from './components/RestaurantForm/RestaurantForm';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <main className="container">
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route path="/orders" component={OrderPage} />
              <Route path="/admin" component={AdminPage} />
              <Route path="/restaurants/new" component={RestaurantForm} />
              <Redirect from="/" to="/home" />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
