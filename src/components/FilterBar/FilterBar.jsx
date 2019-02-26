import React from "react";

function FilterBar() {
  const cuisines = ["All", "Western", "Japanese", "Thai", "Chinese"];

  return (
    <div class="btn-group" role="group" aria-label="Basic example">
      {cuisines.map(cuisine => (
        <button type="button" class="btn btn-outline-primary">
          {cuisine}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
