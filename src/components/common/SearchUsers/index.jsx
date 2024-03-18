import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

import "./index.scss";
import { searchFilter, searchItem } from "../../../utils/user/search";
import qs from "qs";

export default function SearchUsers({ setIsSearch }) {
  const [searchvalue, setSearchValue] = useState([]);

  const handleSearch = async (value) => {
    const data = {
      location: value,
    };
    const searchData = await searchItem(qs.stringify(data));
    if (searchData.status === 200) {
      setSearchValue(searchData.data);
    }
    console.log(searchData);
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
          {/* {console.log(searchvalue.data)} */}
          {searchvalue?.data?.map((d, i) => {
            return (
              <>
                {console.log(d.title)}
                <p key={i}>{d.title}</p>;
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}
