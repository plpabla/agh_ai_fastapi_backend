import Accordion from "react-bootstrap/Accordion";
import Movie from "./Movie";

export default function MoviesList({ movies, setMovies, deleteMovie }) {
  return (
    <Accordion>
      {movies.map((movie, index) => (
        <Accordion.Item eventKey={index} key={index}>
          <Movie movie={movie} />
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
