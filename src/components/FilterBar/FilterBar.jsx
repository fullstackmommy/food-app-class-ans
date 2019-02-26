import React from "react";

function FilterBar() {
  const cuisines = ["All", "Western", "Japanese", "Thai", "Chinese"];

  return (
    <div className="text-center">
    <div className="btn-group" role="group" aria-label="Basic example">
      {cuisines.map(cuisine => (
        <button type="button" className="btn btn-outline-primary">
          {cuisine}
        </button>
      ))}
    </div>
    </div>
  );
}

export default FilterBar;
