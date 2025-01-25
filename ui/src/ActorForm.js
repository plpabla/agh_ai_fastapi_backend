export default function ActorForm({ addActor }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addActor(e.target.name.value, e.target.surname.value);
        e.target.reset();
      }}
    >
      <label>
        Name:
        <input type="text" name="name" required />
      </label>
      <label>
        Surname:
        <input type="text" name="surname" required />
      </label>
      <button type="submit">Add Actor</button>
    </form>
  );
}
