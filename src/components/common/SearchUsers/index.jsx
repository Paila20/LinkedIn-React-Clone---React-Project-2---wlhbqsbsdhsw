import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

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

  const handleSearch = (value) => {
    const searchedData = postsData?.data?.map((item) => {
      if (
        item?.author?.name.toLowerCase() &&
        item.author.name.toLowerCase().includes(value.toLowerCase())
      ) {
        return {
          id: item.author._id,
          userName: item.author.name,
        };
      }
    });
    const uniqueData = new Set(
      searchedData.filter((item) => item !== undefined).map(JSON.stringify)
    );

    const uniqueArray = Array.from(uniqueData).map(JSON.parse);

    setSearchValue(uniqueArray);
  };

  return (
    <div className="search-users">
      <FaSearch />
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
      {searchvalue && (
        <div className="search-result">
          {searchvalue?.map((d, i) => {
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
