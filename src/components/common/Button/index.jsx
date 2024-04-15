import React from "react";
import "./index.css";

export default function Button({ title, onClick, disabled , icon:Icon}) {
  return (
    <button className="common-btn" onClick={onClick} disabled={disabled}>
      {Icon && <Icon/>}{title}
    </button>
  );
}
