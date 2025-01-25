export async function addMovie(title, year, director, description) {
  const response = await fetch("/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, year, director, description }),
  });

  if (!response.ok) {
    console.error("Failed to add movie");
  }
  return response.json();
}

export async function deleteMovie(id) {
  id = Number(id);
  const response = await fetch(`/movies/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.error("Failed to delete movie");
  }
}
