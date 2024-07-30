import { useState, useEffect } from "react";
import SearchButton from "./SearchButton";
import getArtists from "./getArtists";
import SearchResults from "./SearchResults";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    if (inputValue) {
      const fetchArtists = async () => {
        const artists = await getArtists(inputValue);
        setApiResponse(artists);
      };

      fetchArtists();
    } else {
      setApiResponse(null); // or set an empty array if you prefer
    }
  }, [inputValue]);

  const getSearchQuery = (event) => {
    const inputText = event.target.value;
    setInputValue(inputText);
  };

  return (
    <>
      <input
        id="search-box"
        placeholder="search for music here..."
        onChange={getSearchQuery}
      />
      <SearchButton />

      <div className="results-card">
        <SearchResults apiResponse={apiResponse} />
      </div>
    </>
  );
};

export default SearchBar;
