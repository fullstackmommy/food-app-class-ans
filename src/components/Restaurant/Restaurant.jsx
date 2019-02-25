import React from "react";

function Restaurant({item}) {
  const {
    _id,
    name,
    address,
    openingTime,
    closingTime,
    cuisine,
    imageUrl,
    averagePrice
  } = item
  return (
    <div>
      id: {_id}
      name: {name}
      address: {address}
    </div>
  );
}

export default Restaurant;
