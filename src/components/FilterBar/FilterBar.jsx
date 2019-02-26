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
    <div className="btn-group" role="group">
      {cuisines.map(cuisine => (
        <button data-testid={`filter-btn-${cuisine.name.toLowerCase()}`} key={cuisine._id} type="button" className={getClassName(cuisine._id)} onClick={() => handleClick(cuisine)}>
          {cuisine.name}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
