import Accordion from "react-bootstrap/Accordion";
import Movie from "./Movie";

export default function MoviesList({ movies, setMovies, deleteMovie }) {
  const onDelete = (id) => {
    return (evt) => {
      console.log("Deleting movie with id", id);
      deleteMovie(id).then(() => {
        setMovies(movies.filter((movie) => movie.id !== id));
      });
    };
  };

  return (
    <Accordion>
      {movies.map((movie, index) => (
        <Accordion.Item eventKey={index} key={index}>
          <Movie movie={movie} onDelete={onDelete(movie.id)} />
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
