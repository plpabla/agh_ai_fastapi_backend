export default function MovieForm({ addMovie }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addMovie(
          e.target.title.value,
          e.target.year.value,
          e.target.director.value,
          e.target.description.value
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
        <textarea name="description" required />
      </label>
      <button type="submit">Add Movie</button>
    </form>
  );
}
