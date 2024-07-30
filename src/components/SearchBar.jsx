import { useState, useEffect, useRef, Suspense } from "react";
import SearchButton from "./SearchButton";
import getArtists from "./getArtists";
import SearchResults from "./SearchResults";
import useDebounce from "../hooks/useDebounce";
import Loading from "./Loading";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const debounceTimeout = 500;

  // Use a ref to keep track of the current fetch
  const fetchController = useRef(null);

  useEffect(() => {
    if (inputValue) {
      const fetchArtists = async () => {
        // Cancel the previous request if there is one
        if (fetchController.current) {
          fetchController.current.abort();
        }
        // Create a new AbortController
        fetchController.current = new AbortController();

        try {
          const artists = await getArtists(inputValue);
          setApiResponse(artists);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            console.error("Fetch error:", error);
          }
        }
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
        onChange={useDebounce(getSearchQuery, debounceTimeout)}
      />
      <SearchButton />
      <Suspense fallback={<Loading />}>
        <div className="results-card">
          <SearchResults apiResponse={apiResponse} />
        </div>
      </Suspense>
    </>
  );
};

export default SearchBar;
