import { useEffect, useState } from "react";
import fetchMovies from "../api/fetchMovies";
import { Movie } from "../types/movie";
export const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const awaiteMovies = await fetchMovies();
        setMovies(awaiteMovies.results);
        console.log(awaiteMovies.results);
        return awaiteMovies.results;
      } catch (eror) {
        console.error("Error fetching movies:", eror);
      }
    };
    getMovies();
  }, []);

  return (
    <>
      {movies.map((movie) => (
        <article key={movie.id}>
          <h2>{movie.title}</h2>
        </article>
      ))}
    </>
  );
};
export default Movies;
