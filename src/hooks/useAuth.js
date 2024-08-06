import { useEffect, useState } from 'react';

const useAuth = (onAuthError) => {
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const generateRandomString = (length) => {
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const values = crypto.getRandomValues(new Uint8Array(length));
      return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    };

    const sha256 = async (plain) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(plain);
      const hash = await window.crypto.subtle.digest("SHA-256", data);
      return hash;
    };

    const base64encode = (input) => {
      return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    };

    const authorize = async () => {
      const codeVerifier = generateRandomString(64);
      const hashed = await sha256(codeVerifier);
      const codeChallenge = base64encode(hashed);

      const clientId = import.meta.env.VITE_CLIENT_ID;
      const redirectUri = "http://localhost:5173/";

      const scope = "user-read-private user-read-email";
      const authUrl = new URL("https://accounts.spotify.com/authorize");

      window.localStorage.setItem("code_verifier", codeVerifier);

      const params = {
        response_type: "code",
        client_id: clientId,
        scope,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
      };

      authUrl.search = new URLSearchParams(params).toString();
      window.location.href = authUrl.toString();
    };

    const getToken = async (code) => {
      const clientId = import.meta.env.VITE_CLIENT_ID;
      const redirectUri = "http://localhost:5173/";
      const codeVerifier = localStorage.getItem('code_verifier');
      const url = "https://accounts.spotify.com/api/token";

      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      };

      try {
        const response = await fetch(url, payload);
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("Token request failed:", errorResponse);
          throw new Error(errorResponse.error || "Token request failed");
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
      } catch (error) {
        setAuthError(error.message);
        onAuthError(error.message); // Notify parent component
      }
    };

    const handleAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        await getToken(code);
        window.history.replaceState({}, document.title, "/"); // Clean up the URL
      } else {
        authorize(); // Start authorization flow
      }
    };

    handleAuthCallback();
  }, []);

  return authError;
};

export default useAuth;
