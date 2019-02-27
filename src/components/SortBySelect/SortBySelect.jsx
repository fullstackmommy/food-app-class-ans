import React from "react";

function SortBySelect({ handleSortSelect, selectedSort, selectOptions }) {
  return (
    <select
      className="btn btn-primary"
      onChange={handleSortSelect}
      value={selectedSort}
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
