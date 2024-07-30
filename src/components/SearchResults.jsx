const SearchResults = ({ apiResponse }) => {
  if (!apiResponse) {
    return;
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
          </div>
        ))
      ) : (
        <div>No artists found</div>
      )}
    </div>
  );
};

export default SearchResults;
