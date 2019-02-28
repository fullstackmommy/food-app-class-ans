import React from "react";

function Input({name, type, handleChange}) {
  
  const propertyName = `${name.toLowerCase().replace( /\s/, "-")}`
  //snake to camel
  const camelCasedName =  propertyName.replace(/-([a-z])/g, (g) => { return g[1].toUpperCase(); });

  return (
    <div className="form-group">
      <label htmlFor={propertyName}>{name}</label>
      <input type={type} className="form-control" id={propertyName} onChange={handleChange} name={camelCasedName}/>
    </div>
  );
}

export default Input;
