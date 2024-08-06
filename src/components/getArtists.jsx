import makeApiRequest from "../hooks/makeApiRequest";


const getArtists = async (query) => {
  const spotifyBaseUrl = "https://api.spotify.com";
  const searchEndpoint = "/v1/search";
  const searchQuery = `?q=${encodeURIComponent(query)}`;
  const typeQuery = "&type=artist";
  const urlToFetch = `${spotifyBaseUrl}${searchEndpoint}${searchQuery}${typeQuery}`;

  try {
    const data = await makeApiRequest(urlToFetch);
    if (data.artists && data.artists.items) {
      const artists = data.artists.items;
      console.log(artists);
      return artists;
    } else {
      throw new Error('No artist data found');
    }
  } catch (error) {
    console.error("Error fetching artists:", error);
    throw error;
  }
};

export default getArtists;
