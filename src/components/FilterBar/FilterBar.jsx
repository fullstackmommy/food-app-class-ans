import React from "react";

function FilterBar({cuisines, handleClick, selectedCuisineId}) {

  const getClassName = (cuisineId) => {
    if(selectedCuisineId === cuisineId){
      return "btn btn-outline-primary active"
    } 
    else {
      return "btn btn-outline-primary"
    }
  }

  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      {cuisines.map(cuisine => (
        <button key={cuisine._id} type="button" className={getClassName(cuisine._id)} onClick={() => handleClick(cuisine)}>
          {cuisine.name}
        </button>
      ))}
      <p>a paragraph</p>
    </div>
  );
}

export default FilterBar;
