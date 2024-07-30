import { useState } from "react";
import SaveToSpotifyBtn from "./SaveToSpotifyBtn";
import AddToPlaylistBtn from "./AddToPlaylistBtn";

const Track = () => {

  const [trackName, setTrackName] = useState("trackName here");
  const [artist, setArtist] = useState("artist here");
  const [album, setAlbum] = useState("album here");
  const [id, setId] = useState("id here");
  return (
    <>
      <h4>{trackName}</h4>
      <h5>{artist}</h5>
      <h5>{album}</h5>
      <h5>{id}</h5>
      
    <AddToPlaylistBtn />
    </>
  );
};

export default Track;
