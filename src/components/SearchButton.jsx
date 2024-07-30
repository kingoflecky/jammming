import { useState } from "react";
import getArtists from "./getArtists";

const SearchButton = (inputValue) => {
  const handleSearch = () => {
    console.log("clicked search!");
  };

  return (
    <>
      <button className="button" onClick={() => getArtists(inputValue)}>
        🔎
      </button>
    </>
  );
};

export default SearchButton;
