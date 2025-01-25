import Movie from "./Movie";

export default function MoviesList({ movies, setMovies }) {
  return (
    <ul>
      {movies.map((movie, index) => (
        <li key={index}>
          <Movie
            {...movie}
            deleteMovie={() => {
              setMovies(movies.filter((_, i) => i !== index));
            }}
          />
        </li>
      ))}
    </ul>
  );
}
