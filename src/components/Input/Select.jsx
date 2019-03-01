import React from "react";

function Select({ name, options, handleChange, keyName}) {
  const propertyName = `${name.toLowerCase().replace(/\s/, "-")}-input`;

  return (
    <div className="form-group">
      <label htmlFor={propertyName}>{name}</label>
      <select className="form-control" id={propertyName} onChange={handleChange} name={keyName}>
        <option>Choose One</option>
        {options.map(option => (
          <option key={option._id} value={option._id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
