import "milligram";
import { useState, useEffect } from "react";
import MoviesList from "./MoviesList";
import MovieForm from "./MovieForm";
import { addMovie, deleteMovie } from "./db/movies";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className="container">
      <h1>My favourite movies to watch!</h1>
      {movies.length ? (
        <MoviesList
          movies={movies}
          setMovies={setMovies}
          deleteMovie={deleteMovie}
        />
      ) : (
        "ni ma nič za pokazat"
      )}
      <hr />
      <h1>Add movie</h1>
      <MovieForm
        addMovie={(title, year, director, description) => {
          addMovie(title, year, director, description).then((res) =>
            setMovies([...movies, { ...res }])
          );
        }}
      />
    </div>
  );
}

export default App;
