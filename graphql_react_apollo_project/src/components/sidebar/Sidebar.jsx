import { useState } from "react";
import { SidebarHeader } from "./header";
import { Notifications } from "./notifications";
import { Search, SearchResults } from "./search";
// import { Conversations } from "./conversations";

// console.log("notiN",SidebarHeader)

export default function Sidebar({ onlineUsers, typing }) {
  const [searchResults, setSearchResults] = useState([]);
  // console.log(searchResults);
  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/* Sidebar Header */}
      <SidebarHeader />
      {/*  Notifications */}
      <Notifications />
      {/* Search */}
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />

      {searchResults.length > 0 ? (
        <>
          {/* search ressults */}
          <SearchResults
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </>
      ) : (
        <>
          {/* Conversations */}
          {/* <Conversations onlineUsers={onlineUsers} typing={typing} /> */}
        </>
      )}
    </div>
  );
}
