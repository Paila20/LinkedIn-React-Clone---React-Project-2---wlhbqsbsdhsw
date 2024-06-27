import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./index.css";
import { fetchPost } from "../../../utils/user/post";
import { Link } from "react-router-dom";
import { BACKGROUND_COLORS } from "../../../utils/user/login";
import { UseAuthContext } from "../../../helpers/AuthContext";

export default function SearchUsers({ setIsSearch }) {

    const [searchValue, setSearchValue] = useState([]);
    const [postsData, setPostsData] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);

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
  const handleProfileClick = () => {
    setIsSearch(false);
    setSearchValue([]); 
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="search-users" >
      <div className="input-field" >

      <FaSearch
      style={{paddingTop:80, paddingBottom:80}}
        className="close-icon"
        size={20}
        onClick={() => {
          
          handleSearch("");
        }}
      />
      <input
      className="searchInput"
        placeholder="Search .."
        onChange={(event) => handleSearch(event.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      </div>
      {isInputFocused && searchValue.length === 0 && (
        <div className="search-result" style={{ backgroundColor: darkmode ? "black" : "" }}>
          <p>No results matches...</p>
        </div>
      )}

      {!isInputFocused && searchValue.length === 0 && (
        <div className="search-result" style={{ backgroundColor: darkmode ? "black" : "" }}>
          <p></p>
        </div>
      )}

      {searchValue.length !== 0 && (
        <div className="search-result" style={{ backgroundColor: darkmode ? "black" : "" }}>
          {searchValue.map((d, i) => (
            <Link to={`/posts/${d.id}`} key={i} onClick={handleProfileClick}>

              <div className="searchinput">
              <div className="left-content">
                <p><FaSearch style={{ color: darkmode ? "white" : "" }}/></p>
               
               <p style={{ color: darkmode ? "white" : "" }}>{d.userName}</p>
                </div>
               
              <div className="searchimg-profile">
                {d.userName.profileImage ? (
                  <img src={d.userName.profileImage} alt={d.userName}  className="searchimg"/>
                ) : (
                  <h2
                    className="searchimg"
                    style={{
                      backgroundColor:
                        BACKGROUND_COLORS[(d?.userName ? d?.userName.charCodeAt(0) : 0) % 20],
                    }}
                  >
                    {d?.userName ? d?.userName.charAt(0) : ""}
                  </h2>
                )}
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}
        
      </div>
  )}


     