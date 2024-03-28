import React, { useEffect, useMemo, useState } from "react";

import Topbar from "../components/common/Topbar";
import Profile from "../Pages/Profile";
import ProfileCard from "../components/common/ProfileCard";

export default function ProfileLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    if (userData) {
      setCurrentUser(userData);
    }
  }, []);
  // console.log(currentUser)

  return (
    <div>
      <Topbar currentUser={currentUser} />
      <ProfileCard currentUser={currentUser} />
    </div>
  );
}
