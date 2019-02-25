import React from "react";

function Restaurant({ item }) {
  const {
    _id,
    name,
    address,
    openingTime,
    closingTime,
    cuisine,
    imageUrl,
    averagePrice
  } = item;

  const cardStyle = { width: "18rem" };

  return (
    <div className="card" style={cardStyle}>
      <img src={imageUrl} className="card-img-top" alt="..." />
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
  );
}

export default Restaurant;
