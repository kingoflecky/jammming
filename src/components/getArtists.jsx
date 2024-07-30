const getArtists = async (props) => {

  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const authToken = import.meta.env.VITE_ACCESS_TOKEN;

  const spotifyBaseUrl = "https://api.spotify.com";
  const searchEndpoint = "/v1/search";

  const searchQuery = `?q=${props}`;
  const typeQuery = "&type=artist";
  const tokenSuffix = `&access_token=${authToken}`;

  const urlToFetch = `${spotifyBaseUrl}${searchEndpoint}${searchQuery}${typeQuery}${tokenSuffix}`;

  try {
    const response = await fetch(urlToFetch);

    if (response.ok) {
      const jsonResponse = await response.json();
      const artists = await jsonResponse.artists.items;
      
      console.log(artists)
      return artists;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getArtists;
