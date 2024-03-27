import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button";
import "./index.scss";

export default function ProfilePopup({ currentUser }) {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="popup-card">
      <p className="name">{currentUser?.data?.name}</p>
      <Button
        title="View Profile"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.data?._id,
            },
          })
        }
      />
      <Button title="Log out" onClick={handleLogout} disabled={false} />
    </div>
  );
}
