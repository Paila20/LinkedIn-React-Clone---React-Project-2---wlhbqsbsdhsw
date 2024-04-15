import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

import "./index.css";
import { searchFilter, searchItem } from "../../../utils/user/search";
import qs from "qs";
import { fetchPost } from "../../../utils/user/post";
import { Link } from "react-router-dom";

export default function SearchUsers({ setIsSearch }) {
  const [searchvalue, setSearchValue] = useState([]);
  const [postsData, setPostsData] = useState([]);

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
      setSearchValue([]);

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
    <div className="search-users"
    >
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
              <p>{d.userName}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
