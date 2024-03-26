import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import ProfileComponent from "../components/ProfileComponent";
import Loader from "../components/common/Loader";

export default function Profile({ currentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  // useEffect(() => {
  //  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  //     if (userData) {
  //       navigate("/");
  //     } else {
  //       setLoading(false);
  //     }
  //   );
  // }, []);
  return loading ? <Loader /> : <ProfileComponent currentUser={currentUser} />;
}
