import { useState } from "react";
import SaveToSpotifyBtn from "./SaveToSpotifyBtn";

const NewPlaylist = ({ newPlaylist }) => {
  const [playlistName, setPlaylistName] = useState("");

  const handleNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  return (
    <>
      <div className="playlist-card">
        <h3>{playlistName}</h3>

        <input
          type="text"
          placeholder="name your playlist..."
          className="input-box"
          id="playlist-name"
          value={playlistName}
          onChange={handleNameChange}
        ></input>

        {newPlaylist.length > 0 ? (
          <ul id="artist-list">
            {newPlaylist.map((artist, index) => (
              <li key={index}>{artist}</li>
            ))}
          </ul>
        ) : (
          <p>No artists in playlist yet</p>
        )}
      </div>
      <SaveToSpotifyBtn />
    </>
  );
};

export default NewPlaylist;
