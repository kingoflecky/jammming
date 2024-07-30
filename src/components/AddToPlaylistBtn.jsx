import { useEffect, useState } from "react";

const AddToPlaylistBtn = ({ artistName, addArtist}) => {

  const clickHandler = () => {
    addArtist(artistName);
  };

  return (
    <>
      <button
        className="button"
        id="add-to-playlist-btn"
        onClick={clickHandler}
      >
        ➕
      </button>
    </>
  );
};

export default AddToPlaylistBtn;
