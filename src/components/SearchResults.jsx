import { useEffect, useState } from "react";
import AddToPlaylistBtn from "./AddToPlaylistBtn";
import NewPlaylist from "./NewPlaylist";

const SearchResults = ({ apiResponse }) => {
  const [newPlaylist, setNewPlaylist] = useState([]);

  const addArtistToPlaylist = (artistName) => {
    setNewPlaylist((prevPlaylist) => [...prevPlaylist, artistName]);
  };

  useEffect(() => {
    console.log(newPlaylist);
  }, [newPlaylist]);

  if (!apiResponse) {
    return null;
  }

  return (
    <div className="search-results">
      <h3>Search Results</h3>

      {apiResponse.length > 0 ? (
        apiResponse.map((artist) => (
          <div className="render-artists" key={artist.id}>
            {artist.images[0] ? (
              <img
                id="artist-img"
                alt="artist portrait"
                src={artist.images[0].url}
              ></img>
            ) : null}
            <h5 id="artist-name">{artist.name}</h5>
            {artist.genres[0] ? (
              <h5>
                Genre: <br />
                {artist.genres[0]}
              </h5>
            ) : null}
            {artist.followers.total ? (
              <h5>
                Followers: <br />
                {artist.followers.total}
              </h5>
            ) : null}
            <h5>
              Popularity: <br /> {artist.popularity}
            </h5>
            <AddToPlaylistBtn
              artistName={artist.name}
              addArtist={addArtistToPlaylist}
            />
          </div>
        ))
      ) : (
        <div>No artists found</div>
      )}

      <NewPlaylist newPlaylist={newPlaylist} />
    </div>
  );
};

export default SearchResults;
