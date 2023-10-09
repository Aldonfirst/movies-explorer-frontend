import { useState } from "react";
import "./MoviesCard.css"
import { useEffect } from "react";

import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useCallback } from "react";
import { MINUTES_IN_HOUR, ZERO } from "../../constants/constants";
import { MoviesContext } from "../../../Contexts/MovieContext";


function MoviesCard({ movie, saveMovie, removeMovie }) {
  const location = useLocation();
  const { savedMovies } = useContext(MoviesContext);
  const [isSaved, setIsSaved]= useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [foundMovie, setFoundMovie] = useState(null);

  // Вычисление длительности фильма
  const formatDuration = () => {
    const hours = Math.floor(movie.duration / MINUTES_IN_HOUR);
    const minutes = movie.duration % MINUTES_IN_HOUR;
    let durationString = "";
    if (hours >  ZERO) {
      durationString += `${hours}ч`;
    } if (minutes >  ZERO) {
      if (durationString.length >  ZERO) {
        durationString += " ";
      }
      durationString += `${minutes}м`;
    }
    return durationString;
  };

  //проверка - сохранен ли фильм пользователем
  useEffect(() => {
    const found = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
    setFoundMovie(found);
    setIsSaved(!!found);
  }, [movie.id, savedMovies]);

  //  получение URL изображения фильма чтобы  при перемещении на SavedMovies не ломалась
  useEffect(() => {
    if (typeof movie.image === "object") {
      setImageUrl(`https://api.nomoreparties.co/${movie.image.url}`);
    } else if (typeof movie.image === "string") {
      setImageUrl(movie.image);
    }
  }, [movie.image]);

  //  обработка нажатия лайка добавления/удаления фильма
  const handleLikeClick = useCallback(async (evt) => {
    evt.preventDefault();
    if (location.pathname === "/movies") {
      if (!isSaved) {
        saveMovie(movie);
      } else {
        if (foundMovie && foundMovie._id) {
          removeMovie(foundMovie._id)
        }
      }
    } else if (location.pathname === "/saved-movies") {
      if (movie._id) {
        removeMovie(movie._id);
      }
    }
  }, [isSaved, movie, location.pathname, foundMovie, saveMovie, removeMovie]);

  return (
    <section>
      <a
        className="movies-card__trailer-link"
        href={movie.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={imageUrl} alt={movie.nameRU} className="movies-card__image" />
      </a>
      <div className="movies-card__info">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        {location.pathname === '/movies' && (
          <button
            type="button"
            className={`movies-card__like ${isSaved ? 'movies-card__like_active' : ''}`}
            onClick={handleLikeClick}
          >
            ♥️
          </button>
        )}
        {location.pathname === '/saved-movies' && (
          <button
            type="button"
            className="movies-card__like_delete"
            onClick={handleLikeClick}
          >
            ×
          </button>
        )}
      </div>
      <p className="movies-card__duration">{formatDuration()}</p>
    </section>
  );
}
export default MoviesCard;
