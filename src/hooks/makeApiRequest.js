import getRefreshToken from './getRefreshToken';

const makeApiRequest = async (url) => {
  let accessToken = localStorage.getItem('access_token');
  
  // Log current access token
  console.log("Current access token:", accessToken);

  let response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.status === 401) { // Token expired
    console.log("Access token expired, refreshing...");
    await getRefreshToken();
    accessToken = localStorage.getItem('access_token');

    // Log new access token
    console.log("New access token:", accessToken);

    // Retry the request with the new access token
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("API request failed:", errorResponse);
    throw new Error(`API request failed: ${errorResponse.error}`);
  }

  const data = await response.json();
  return data;
};

export default makeApiRequest;
