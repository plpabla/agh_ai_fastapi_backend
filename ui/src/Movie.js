import Accordion from "react-bootstrap/Accordion";

export default function Movie({ movie }) {
  return (
    <>
      <Accordion.Header>
        {movie.title} ({movie.year})
      </Accordion.Header>
      <Accordion.Body>
        <p>Director: {movie.director}</p>
        <p>{movie.description}</p>
        <button className="button button-clear" onClick={movie.deleteMovie}>
          Delete
        </button>
      </Accordion.Body>
    </>
  );
}
