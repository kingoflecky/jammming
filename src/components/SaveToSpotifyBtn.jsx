import { useState } from "react";

const SaveToSpotifyBtn = () => {

    const [count, setCount] = useState(0);

    if (count > 0) {
      
    }
  
      return (
        <>
         <button className='button' onClick={() => setCount((count) => count + 1)}>
         SAVE TO SPOTIFY {count} 
          </button>
        </>
      );
    };
  
  export default SaveToSpotifyBtn;