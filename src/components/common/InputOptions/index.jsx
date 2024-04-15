import React from "react";
import "./index.css";
function InputOptions({ Icon, title, color, onClick }) {
    const IconComponent = Icon;
  return (
    <div className="inputoption" onClick={onClick}>
      <IconComponent style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  );
}

export default InputOptions;