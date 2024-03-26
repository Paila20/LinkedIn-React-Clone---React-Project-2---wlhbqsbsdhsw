import React from "react";
import "./index.css";
function InputOptions({ Icon, title, color }) {
    const IconComponent = Icon;
  return (
    <div className="inputoption">
      <IconComponent style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  );
}

export default InputOptions;