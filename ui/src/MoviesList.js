import Movie from "./Movie";

export default function MoviesList({ movies, setMovies, deleteMovie }) {
  return (
    <ul>
      {movies.map((movie, index) => (
        <li key={index}>
          <Movie
            {...movie}
            deleteMovie={() => {
              console.log(">>> deleting movie", movie.id);
              deleteMovie(movie.id).then(() =>
                setMovies(movies.filter((_, i) => i !== index))
              );
            }}
          />
        </li>
      ))}
    </ul>
  );
}
