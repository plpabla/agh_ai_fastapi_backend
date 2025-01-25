import { useState, useEffect } from "react";
import { getActors } from "./db/actors";

export default function MovieForm({ addMovie }) {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    getActors().then((data) => setActors(data));
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addMovie(
          e.target.title.value,
          e.target.year.value,
          e.target.director.value,
          e.target.description.value,
          Array.from(e.target.actors.selectedOptions).map((option) =>
            Number(option.value)
          )
        );
        e.target.reset();
      }}
    >
      <label>
        Title:
        <input type="text" name="title" required />
      </label>
      <label>
        Year:
        <input type="number" name="year" required />
      </label>
      <label>
        Director:
        <input type="text" name="director" required />
      </label>
      <label>
        Description:
        <textarea name="description" />
      </label>
      <label>
        Actors:
        <select name="actors" multiple>
          {actors.map((actor) => (
            <option key={actor.id} value={actor.id}>
              {actor.name} {actor.surname}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Add Movie</button>
    </form>
  );
}
