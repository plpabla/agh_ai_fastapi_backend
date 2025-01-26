const fn = (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  fetch(`/search/${query}`)
    .then((response) => response.json())
    .then((data) => fetch(`/movies/${data.id}`))
    .then((response) => response.json())
    .then((data) => alert(data.title));
};

export default function Search() {
  return (
    <div className="mt-4">
      <form onSubmit={fn}>
        <input type="text" placeholder="Search..." className="border p-2" />
      </form>
    </div>
  );
}
