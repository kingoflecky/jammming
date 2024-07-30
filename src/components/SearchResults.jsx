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
            <h5 id="artist-name">{artist.name}</h5>
            {artist.images[0] ? <img id='artist-img' alt="artist portrait" src={artist.images[0].url}></img> : null}
       
          </div>
        ))
      ) : (
        <div>No artists found</div>
      )}
    </div>
  );
};

export default SearchResults;
