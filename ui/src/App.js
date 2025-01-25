import "milligram";
import { useState, useEffect } from "react";
import MoviesList from "./MoviesList";
import MovieForm from "./MovieForm";
import ActorForm from "./ActorForm";
import { addMovie, deleteMovie } from "./db/movies";
import { addActor } from "./db/actors";

function App() {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);

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
        addMovie={(title, year, director, description, actorsList) => {
          addMovie(title, year, director, description, actorsList).then((res) =>
            setMovies([...movies, { ...res }])
          );
        }}
      />

      <hr />
      <h1>Add actor</h1>
      <ActorForm
        addActor={(name, surname) => {
          addActor(name, surname)
            .then((res) => setActors([...actors, { ...res }]))
            .then(window.location.reload());
        }}
      />
    </div>
  );
}

export default App;
