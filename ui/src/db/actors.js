export async function addActor(name, surname) {
  const response = await fetch("/actors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, surname }),
  });
  return response.json();
}

export async function getActors() {
  const response = await fetch("/actors");
  return response.json();
}

export async function getActorsForMovie(movieId) {
  const response = await fetch(`/movies/${movieId}/actors`);
  return response.json();
}
