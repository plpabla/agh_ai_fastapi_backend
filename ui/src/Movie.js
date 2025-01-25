import Accordion from "react-bootstrap/Accordion";

export default function Movie({ movie, onDelete }) {
  return (
    <>
      <Accordion.Header>
        {movie.title} ({movie.year})
      </Accordion.Header>
      <Accordion.Body>
        <p>Director: {movie.director}</p>
        <p>{movie.description}</p>
        <button className="button" onClick={onDelete}>
          Delete
        </button>
      </Accordion.Body>
    </>
  );
}
