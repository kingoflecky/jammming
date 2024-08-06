const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  };

  try {
    const response = await fetch(url, payload);
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Token refresh failed:", errorResponse);
      throw new Error(errorResponse.error || "Token refresh failed");
    }

    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      console.log("New access token stored:", data.access_token);
    }

    if (data.refresh_token) {
      localStorage.setItem("refresh_token", data.refresh_token);
      console.log("New refresh token stored:", data.refresh_token);
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

export default getRefreshToken;
