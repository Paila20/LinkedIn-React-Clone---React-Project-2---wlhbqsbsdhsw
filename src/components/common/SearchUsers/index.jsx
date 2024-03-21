import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

import "./index.scss";
import { searchFilter, searchItem } from "../../../utils/user/search";
import qs from "qs";
import { fetchPost } from "../../../utils/user/post";

export default function SearchUsers({ setIsSearch }) {
  const [searchvalue, setSearchValue] = useState([]);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    fetchingPosts();
  });

  const fetchingPosts = async () => {
    const searchData = await fetchPost();
    if (searchData.status === 200) {
      setPostsData(searchData.data);
    }
  };

  const handleSearch = async (value) => {
    // const data = {
    //   location: value,
    // };
    // const searchData = await searchItem(qs.stringify(data));
    // if (searchData.status === 200) {
    //   setSearchValue(searchData.data);
    // }
    console.log(postsData.data);
    const searchData = postsData?.data?.map((item) => {
      return {
        id: item.author._id,
        userName: item.author.name,
      };
    });
    const arr = searchData;

    setSearchValue(new Set(arr));
  };

  const handleFilter = async () => {
    const searchFilter = await searchFilter();
    console.log(searchFilter);
  };

  return (
    <div className="search-users">
      <input
        placeholder="Search Users.."
        onChange={(event) => handleSearch(event.target.value)}
      />
      <AiOutlineCloseCircle
        className="close-icon"
        size={20}
        onClick={() => {
          setIsSearch(false);
          handleSearch("");
        }}
      />
      {console.log(searchvalue.data)}
      {searchvalue && (
        <div className="search-result">
  
          {searchvalue?.map((d, i) => {
            console.log(d);
            return (
              <>
                <p key={i}>{d.userName}</p>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}
