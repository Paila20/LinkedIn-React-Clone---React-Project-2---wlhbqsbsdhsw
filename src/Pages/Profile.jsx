import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
// import ProfileComponent from "../components/ProfileComponent";
import Loader from "../components/common/Loader";
import ProfileCard from "../components/common/ProfileCard";

export default function Profile({ currentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  console.log(currentUser);
  useEffect(() => {}, [currentUser]);

  return Object.keys(currentUser) < 1 ? (
    <Loader />
  ) : (
    <ProfileCard currentUser={currentUser} />
  );
}
