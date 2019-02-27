import React from "react";

function SortBySelect({ handleSortSelect, selectedSort, selectOptions }) {
  return (
    <label>
      Sort By: 
     </label> 
    <select
      className="btn btn-primary"
      onChange={handleSortSelect}
      value={selectedSort}
      title="sort-select"
      data-testid="sort-select"
    >
      {selectOptions.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default SortBySelect;
