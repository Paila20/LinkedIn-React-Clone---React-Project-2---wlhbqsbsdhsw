import React from "react";
import "./index.css";
function InputOptions({ Icon, title, color, onClick, size }) {
    const IconComponent = Icon;
  return (
    <div className="inputoption" onClick={onClick}>
      <IconComponent style={{ color: color ,fontSize:size}} />
      <h4 style={{ fontSize: "1.2rem" }}>{title}</h4>
    </div>
  );
}

export default InputOptions;