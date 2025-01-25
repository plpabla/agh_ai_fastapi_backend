import "milligram";
import { useState } from "react";
import MoviesList from "./MoviesList";
import MovieForm from "./MovieForm";

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
        addMovie={(title, year) => {
          setMovies([...movies, { title, year }]);
        }}
      />
    </div>
  );
}

export default App;
