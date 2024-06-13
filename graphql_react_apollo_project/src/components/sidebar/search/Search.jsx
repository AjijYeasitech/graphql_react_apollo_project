import { useState } from "react";
import { FilterIcon, ReturnIcon, SearchIcon } from "../../../svg";
import { useSelector } from "react-redux";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_SEARCH_USER } from "../../../dataFetchQuery/user.query";

export default function Search({ searchLength, setSearchResults }) {
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const [show, setShow] = useState(false);
  const [searchUser, { loading, error, data }] = useLazyQuery(GET_SEARCH_USER, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const HandleSearch = async (e) => {
    if (e.target.value && e.key === "Enter") {
      try {
        const { data } = await searchUser({
          variables: { searchParam: e.target.value },
        });
        setSearchResults(data);
      } catch (error) {
        console.log(error.response.data.error.message);
      }
    } else {
      setSearchResults([]);
    }
  };
  return (
    <div className="h-[49px] py-1.5">
      {/* Container */}
      <div className="px-[10px]">
        {/* Search input container */}
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchLength > 0 ? (
              <span
                className="w-8 flex items-center justify-center rotateAnimation cursor-pointer"
                onClick={() => setSearchResults([])}
              >
                <ReturnIcon className="fill-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center ">
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              placeholder="Search or start a new chat"
              className="input"
              onFocus={() => setShow(true)}
              onBlur={() => searchLength === 0 && setShow(false)}
              onKeyDown={(e) => HandleSearch(e)}
            ></input>
          </div>
          <button className="btn">
            <FilterIcon className="fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  );
}
