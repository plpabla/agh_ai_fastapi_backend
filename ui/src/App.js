import "milligram";
import { useState } from "react";
import MoviesList from "./MoviesList";
import MovieForm from "./MovieForm";

async function addMovie(title, year, director, description) {
  const response = await fetch("/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, year, director, description }),
  });

  if (!response.ok) {
    console.error("Failed to add movie");
  }
}

function App() {
  const [movies, setMovies] = useState([]);

  return (
    <div className="container">
      <h1>My favourite movies to watch!</h1>
      {movies.length ? (
        <MoviesList movies={movies} setMovies={setMovies} />
      ) : (
        "ni ma nič za pokazat"
      )}
      <hr />
      <h1>Add movie</h1>
      <MovieForm
        addMovie={(title, year, director, description) => {
          addMovie(title, year, director, description).then(() =>
            setMovies([...movies, { title, year, director, description }])
          );
        }}
      />
    </div>
  );
}

export default App;
