import React from "react";
import "./Restaurant.scss"

function Restaurant({ item }) {
  const { name, openingTime, closingTime, cuisine, imageUrl } = item;

  const cardStyle = { width: "20rem" };

  return (
    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 d-flex mb-4">
      <div className="card" style={cardStyle}>
        <img src={imageUrl} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <div className="card-text">
            <h6 className="text-muted">{cuisine.name}</h6>
            <h6>
              {openingTime} - {closingTime}
            </h6>
          </div>
        </div>
        <div className="card-footer text-muted">
          <button className="btn btn-primary">Order</button>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
