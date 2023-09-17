import { useState } from "react";
import "./MoviesCard.css"

const MoviesCard = ({ movie }) => {
  const [isSaved, setIsSaved] = useState(movie.isSaved);

  const handleClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <section>
      <img src={movie.poster} alt={movie.title} className="movies-card__image" />
      <div className="movies-card__info">
        <h3 className="movies-card__title">{movie.title}</h3>
        {movie.isDelete ? (
          <button
            className={"movies-card__like_delete"}
            onClick={handleClick}
          >	&times;
          </button>
        ) : (
          <button
            className={`movies-card__like ${isSaved ? "movies-card__like_active" : ""}`}
            onClick={handleClick}
          >
            &#9829;
          </button>
        )}
      </div>
      <p className="movies-card__duration">{movie.duration}</p>
    </section>
  );
};

export default MoviesCard;
