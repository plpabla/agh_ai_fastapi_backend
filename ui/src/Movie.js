import { useState } from "react";
import { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";

import { getActorsForMovie } from "./db/actors";

export default function Movie({ movie, onDelete }) {
  const [actors, setActors] = useState([]);
  useEffect(() => {
    getActorsForMovie(movie.id).then((data) => setActors(data));
  }, [movie.id]);

  return (
    <>
      <Accordion.Header>
        {movie.title} ({movie.year})
      </Accordion.Header>
      <Accordion.Body>
        <p>Director: {movie.director}</p>
        <p>
          <em>{movie.description}</em>
        </p>
        <Stack direction="horizontal" gap={4} className="mb-4">
          {actors.map((actor) => (
            <Badge key={actor.id} bg="primary">
              {actor.name} {actor.surname}
            </Badge>
          ))}
        </Stack>
        <button
          className="button m-2"
          onClick={() => {
            console.log("TODO");
          }}
        >
          Edit
        </button>
        <button className="button" onClick={onDelete}>
          Delete
        </button>
      </Accordion.Body>
    </>
  );
}
