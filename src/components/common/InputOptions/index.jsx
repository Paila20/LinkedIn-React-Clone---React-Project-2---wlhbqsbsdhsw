import React from "react";
import "./index.css";
function InputOptions({ Icon, title, color, onClick, size }) {
    const IconComponent = Icon;
  return (
    <div className="inputoption" onClick={onClick}>
      <IconComponent style={{ color: color ,fontSize:size}} />
      <h4 style={{ fontSize: "0.9rem" }}>{title}</h4>
    </div>
  );
}

export default InputOptions;