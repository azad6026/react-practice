import { Movie } from "../types/movie";
import { useFavoritesStore } from "../stores/useFavoritesStore";
import { HeartIcon } from "@heroicons/react/24/solid";

export default function MovieCard({ movie }: { movie: Movie }) {
  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = favorites.some((m) => m.id === movie.id);

  return (
    <article className="movie-card">
      <figure style={{ viewTransitionName: "movie-image" }}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : `https://placehold.co/600x600?text= ${movie.title}`
          }
          alt={movie.title}
          className="movie-image"
        />
      </figure>
      <div className="movie-content">
        <h3 className="movie-title">{movie.title}</h3>
        <button
          className={`favorite-button ${isFavorite ? "favorited" : ""}`}
          onClick={() => toggleFavorite(movie)}
        >
          <HeartIcon className="heart-icon" />
          <span>{isFavorite ? "Remove Favorite" : "Add Favorite"}</span>
        </button>
      </div>
    </article>
  );
}
