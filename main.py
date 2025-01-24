# To run dev:
# $ fastapi dev main.py

from fastapi import FastAPI, HTTPException
import models
import schemas

app = FastAPI()
# http://127.0.0.1:8000/docs


######################################
# CRUD for Movies
######################################
@app.get("/movies/", response_model=list[schemas.Movie])
async def get_movies():
    return list(models.Movie.select())


@app.get("/movies/{movie_id}", response_model=schemas.Movie)
def get_movie(movie_id: int):
    try:
        movie = models.Movie.get_by_id(movie_id)
        return movie
    except models.Movie.DoesNotExist:
        raise HTTPException(status_code=404, detail="Movie not found")


@app.post("/movies/", response_model=schemas.Movie)
async def create_movie(movie: schemas.MovieCreate):
    movie = models.Movie.create(**movie.dict())
    return movie


@app.delete("/movies/{movie_id}")
def delete_movie(movie_id: int):
    try:
        movie = models.Movie.get_by_id(movie_id)
        movie.delete_instance()
        return {"message": "Movie deleted"}
    except models.Movie.DoesNotExist:
        raise HTTPException(status_code=404, detail="Movie not found")


######################################
# CRUD for Actors
######################################
@app.get("/actors/", response_model=list[schemas.Actor])
async def get_actors():
    return list(models.Actor.select())


@app.get("/actors/{actor_id}", response_model=schemas.Actor)
def get_actor(actor_id: int):
    try:
        actor = models.Actor.get_by_id(actor_id)
        return actor
    except models.Actor.DoesNotExist:
        raise HTTPException(status_code=404, detail="Actor not found")


@app.delete("/actors/{actor_id}")
def delete_actor(actor_id: int):
    try:
        actor = models.Actor.get_by_id(actor_id)
        actor.delete_instance()
        return {"message": "Actor deleted"}
    except models.Actor.DoesNotExist:
        raise HTTPException(status_code=404, detail="Actor not found")


@app.post("/actors/", response_model=schemas.Actor)
async def create_actor(actor: schemas.ActorCreate):
    actor = models.Actor.create(**actor.dict())
    return actor


@app.post("/movies/", response_model=schemas.Movie)
async def create_movie(title: str, director: str, year: int, description: str):
    movie = models.Movie.create(
        title=title, director=director, year=year, description=description, actors=[]
    )
    return movie


######################################
# CRUD for Movies' Actors
######################################
@app.get("/movies/{movie_id}/actors/", response_model=list[schemas.Actor])
async def get_movie_actors(movie_id: int):
    try:
        movie = models.Movie.get_by_id(movie_id)
        return list(movie.actors)
    except models.Movie.DoesNotExist:
        raise HTTPException(status_code=404, detail="Movie not found")


@app.post("/movies/{movie_id}/actors/{actor_id}")
async def add_movie_actor(movie_id: int, actor_id: int):
    try:
        movie = models.Movie.get_by_id(movie_id)
        actor = models.Actor.get_by_id(actor_id)
        if actor in movie.actors:
            raise HTTPException(
                status_code=400, detail="Actor already assigned to this movie"
            )
        movie.actors.add(actor)
        return {"message": "Actor added to movie"}
    except models.Movie.DoesNotExist:
        raise HTTPException(status_code=404, detail="Movie not found")
    except models.Actor.DoesNotExist:
        raise HTTPException(status_code=404, detail="Actor not found")


@app.delete("/movies/{movie_id}/actors/{actor_id}")
async def remove_movie_actor(movie_id: int, actor_id: int):
    try:
        movie = models.Movie.get_by_id(movie_id)
        actor = models.Actor.get_by_id(actor_id)
        if actor not in movie.actors:
            raise HTTPException(
                status_code=404, detail="Actor not assigned to this movie"
            )
        movie.actors.remove(actor)
        return {"message": "Actor removed from movie"}
    except models.Movie.DoesNotExist:
        raise HTTPException(status_code=404, detail="Movie not found")
    except models.Actor.DoesNotExist:
        raise HTTPException(status_code=404, detail="Actor not found")
