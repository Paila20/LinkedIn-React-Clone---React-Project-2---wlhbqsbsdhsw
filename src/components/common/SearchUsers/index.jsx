import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

import "./index.css";
import { searchFilter, searchItem } from "../../../utils/user/search";
import qs from "qs";
import { fetchPost } from "../../../utils/user/post";
import { Link } from "react-router-dom";
import { BACKGROUND_COLORS } from "../../../utils/user/login";
import { UseAuthContext } from "../../../helpers/AuthContext";

export default function SearchUsers({ setIsSearch }) {
   const [searchvalue, setSearchValue] = useState([]);
    const [postsData, setPostsData] = useState([]);

    const {darkmode} =UseAuthContext();

  useEffect(() => {

   
   if (postsData.length === 0) {
      fetchingPosts();
    }
  }, [postsData]);



  const fetchingPosts = async () => {
    const searchData = await fetchPost();
    if (searchData.status === 200) {
      setPostsData(searchData.data);
    }
  };

  const handleSearch = (value) => {
    setSearchValue([]);
    if (!postsData?.data) {
      

      return;
    }

    const searchedData = postsData.data.map((item) => {
      if (
        item?.author?.name &&
        item.author.name.toLowerCase().includes(value.toLowerCase())
      ) {
        return {
          id: item.author._id,
          userName: item.author.name,
        };
      }
      return null;
    });

    const filteredData = searchedData.filter((item) => item !== null);

    const uniqueData = new Set(filteredData.map(JSON.stringify));
    const uniqueArray = Array.from(uniqueData).map(JSON.parse);

    setSearchValue(uniqueArray);
  };

  return (
    <div className="search-users" style={{ backgroundColor: darkmode ? 'black' : '' }}>
      <div className="input-field">

      <FaSearch
      style={{paddingTop:80, paddingBottom:80}}
        className="close-icon"
        size={20}
        onClick={() => {
          setIsSearch(false);
          handleSearch("");
        }}
      />
      <input
      className="searchInput"
        placeholder="Search Users.."
        onChange={(event) => handleSearch(event.target.value)}
      />
      </div>

      {searchvalue.length === 0 ? (
        <div className="search-result">
          <p></p>
        </div>
      ) : (
        <div className="search-result">
          {searchvalue.map((d, i) => (
            <Link to={`/profile/${d.id}`} key={i}>
              <div className="searchinput">
              <p><FaSearch/></p>
              {
                d.userName.profileImage ? (<img src={d.userName.profileImage}/>) : ( <h2
                  className="searchimg"
                  style={{
                    backgroundColor:
                      BACKGROUND_COLORS[
                        (d?.userName
                          ? d?.userName.charCodeAt(0)
                          : 0) % 20
                      ],
                  }}
                >
                  {d?.userName ? d?.userName.charAt(0) : ""}
                </h2>)
              }
              <p>{d.userName}</p>
              </div>
             
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
