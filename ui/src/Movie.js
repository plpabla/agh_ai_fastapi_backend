export default function Movie({ title, year, deleteMovie }) {
  return (
    <>
      {title} ({year}){" "}
      <button className="button button-clear" onClick={deleteMovie}>
        Delete
      </button>
    </>
  );
}
