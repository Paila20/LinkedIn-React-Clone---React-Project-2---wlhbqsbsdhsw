
import React, { useEffect, useState } from "react";
import { UseAuthContext } from "../../../helpers/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../Button";
import { FaEllipsisH } from "react-icons/fa";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import { BACKGROUND_COLORS } from "../../../utils/user/login";
import Loader from "../Loader";
import Topbar from "../Topbar";
import { HiOutlinePencil } from "react-icons/hi";
import "./index.css";

export default function Profile() {
  const { currentUser, darkmode, setCurrentUser } = UseAuthContext();

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleProfile();
  }, []);

  const handleProfile = () => {
    if (id !== undefined) {
      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      if (Object.keys(userData).length > 0) {
        setCurrentUser(userData);
        setLoading(false);
      }
    }
  };

  console.log(currentUser);

  return (
    <div style={{ backgroundColor: darkmode ? "black" : "" }}>
      <div className="topbar">
        <Topbar />
      </div>
      {loading ? (
        <Loader />
      ) : currentUser !== null ? (
        <div className="profile-card">
          <div>
            <div className="backimg"></div>
            {currentUser?.data?.profileImage ? (
              <img
                className="profile-image"
                src={currentUser.data.profileImage}
                alt="profile-image"
              />
            ) : (
              <h2
                className="profile-image"
                style={{
                  backgroundColor:
                    BACKGROUND_COLORS[
                      (currentUser?.data?.user?.name
                        ? currentUser?.data?.user?.name.charCodeAt(0)
                        : 0
                      ) % 20
                    ],
                }}
              >
                {currentUser?.data?.user?.name
                  ? currentUser?.data?.user?.name.charAt(0)
                  : ""}
              </h2>
            )}

            <h3 className="userName" style={{ color: darkmode ? "white" : "" }}>
              {currentUser?.data?.user?._id !== id
                ? id
                : currentUser?.data?.user?.name}
            </h3>
          </div>
          <div>
            <div
              className="lang"
              style={{
                backgroundColor: darkmode ? "black" : "",
                border: `1px solid ${darkmode ? "white" : "lightgrey"}`,
              }}
            >
              <div style={{ color: darkmode ? "white" : "", marginTop: -30 }}>
                <h2 className="profilelang">Profile Language</h2>
                <p className="english">English</p>
              </div>

              <hr className="hrgroup"></hr>
              <div>
                <h2 className="profile-url" style={{ color: darkmode ? "white" : "" }}>
                  Public profile & URL
                </h2>
                <p className="url" style={{ color: darkmode ? "white" : "" }}>
                  www.linkedin.com/{currentUser?.data?.user?.email}
                </p>
              </div>
            </div>
            <div
              className="sideprofile"
              style={{
                backgroundColor: darkmode ? "black" : "",
                border: `1px solid ${darkmode ? "white" : "lightgrey"}`,
              }}
            >
              <p className="ad" style={{ color: darkmode ? "white" : "" }}>
                Ad <FaEllipsisH style={{ color: darkmode ? "white" : "" }} />
              </p>
              <p style={{ color: darkmode ? "white" : "" }}>
                {currentUser?.data?.user?.name}, boost your job search with premium
              </p>
              <div className="images" style={{ color: darkmode ? "white" : "" }}>
                <h2
                  className="logoo"
                  style={{
                    backgroundColor:
                      BACKGROUND_COLORS[
                        (currentUser?.data?.user?.name
                          ? currentUser?.data?.user?.name.charCodeAt(0)
                          : 0
                        ) % 20
                      ],
                  }}
                >
                  {currentUser?.data?.user?.name
                    ? currentUser?.data?.user?.name.charAt(0)
                    : ""}
                </h2>
                <img
                  className="linklogo"
                  src={LinkedinLogo}
                  alt="linkedin-logo"
                  style={{ color: darkmode ? "white" : "" }}
                />
              </div>
              <p style={{ color: darkmode ? "white" : "" }}>
                See who's viewed your profile in the last 90 days
              </p>
              <Button title="Try for free!" />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="profile-details" style={{ backgroundColor: darkmode ? "black" : "" }}>
        <div className="profile-details-top">
          <h3 className="profile-details-info">Experience</h3>
          <HiOutlinePencil className="pen" />
        </div>
      </div>

      <div className="profile-details1" style={{ backgroundColor: darkmode ? "black" : "" }}>
        <div className="profile-details-top">
          <h3 className="profile-details-info">Education</h3>
          <HiOutlinePencil className="pen1" />
        </div>
      </div>

      <div className="profile-details2" style={{ backgroundColor: darkmode ? "black" : "" }}>
        <div className="profile-details-top">
          <h3 className="profile-details-info">Skills</h3>
          <HiOutlinePencil className="pen2" />
        </div>
      </div>
    </div>
  );
}
