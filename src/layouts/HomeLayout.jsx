import React, { useEffect, useMemo, useState } from "react";
import { Home } from "../Pages/Home";

import Topbar from "../components/common/Topbar";
import { fetchPost } from "../utils/user/post";

export default function HomeLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    if (userData) {
      setCurrentUser(userData);
    }
  }, []);
  return (
    <div>
      <Topbar currentUser={currentUser} />
      <Home currentUser={currentUser} />
    </div>
  );
}
