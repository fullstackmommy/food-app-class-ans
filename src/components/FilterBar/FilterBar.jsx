import React from "react";

function FilterBar({cuisines, handleClick}) {

  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      {cuisines.map(cuisine => (
        <button key={cuisine._id} type="button" className="btn btn-outline-primary" onClick={() => handleClick(cuisine)}>
          {cuisine.name}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
