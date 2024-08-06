import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import useAuth from "./hooks/useAuth";

function App() {
  const authError = useAuth((error) => {
    console.error("Authentication error:", error);
  });

  if (authError) {
    return (
      <div>
        <h1>Spotify API App</h1>
        <p style={{ color: "red" }}>
          Authentication failed. Please{" "}
          <a href="/" onClick={() => window.location.reload()}>
            try again
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      <h1>Spotify API App</h1>
      <SearchBar />
    </>
  );
}

export default App;
