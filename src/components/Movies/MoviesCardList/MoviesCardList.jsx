import { WINDOW_WIDTH_LARGE, WINDOW_WIDTH_MEDIUM, WINDOW_WIDTH_SMALL, WINDOW_WIDTH_XSMALL, 
  CARDS_TO_SHOW_LARGE, CARDS_TO_SHOW_MEDIUM, CARDS_TO_SHOW_SMALL, CARDS_TO_SHOW_XSMALL, 
  CARDS_TO_ADD_LARGE, CARDS_TO_ADD_MEDIUM, CARDS_TO_ADD_SMALL, CARDS_TO_ADD_XSMALL 
} from "../../constants/constants";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";
import "./MoviesCardList.css";
import useResizeHook from "../../../hooks/useResizeHook";
import { MoviesContext } from "../../Contexts/MovieContext";
import { useContext } from "react";

function MoviesCardList({ isSaved,movies }) {
  const { saveMovie, removeMovie } = useContext(MoviesContext);
  const windowWidth = useResizeHook();//кастомный хук ресайза
  const [cardsToShow, setCardsToShow] = useState(16);

// Re-render количества карточек в зависимости от ширины окна.
  useEffect(() => {
    if (windowWidth >= WINDOW_WIDTH_LARGE) {
      setCardsToShow(CARDS_TO_SHOW_LARGE);
    } else if (windowWidth >= WINDOW_WIDTH_MEDIUM && windowWidth < WINDOW_WIDTH_LARGE) {
      setCardsToShow(CARDS_TO_SHOW_MEDIUM);
    } else if (windowWidth >= WINDOW_WIDTH_SMALL && windowWidth < WINDOW_WIDTH_MEDIUM) {
      setCardsToShow(CARDS_TO_SHOW_SMALL);
    } else if (windowWidth >= WINDOW_WIDTH_XSMALL && windowWidth < WINDOW_WIDTH_SMALL) {
      setCardsToShow(CARDS_TO_SHOW_XSMALL);
    }
  }, [windowWidth]);

  //Добавление дополнительных карточек при нажатии на кнопку "Еще" в зависимости от ширины окна
  const handleShowMore = () => {
    if (windowWidth >= WINDOW_WIDTH_XSMALL && windowWidth < WINDOW_WIDTH_SMALL) {
      setCardsToShow(cardsToShow + CARDS_TO_ADD_XSMALL);
    } else if (windowWidth >= WINDOW_WIDTH_SMALL && windowWidth < WINDOW_WIDTH_MEDIUM) {
      setCardsToShow(cardsToShow + CARDS_TO_ADD_SMALL);
    } else if (windowWidth >= WINDOW_WIDTH_MEDIUM && windowWidth < WINDOW_WIDTH_LARGE) {
      setCardsToShow(cardsToShow + CARDS_TO_ADD_MEDIUM);
    } else {
      setCardsToShow(cardsToShow + CARDS_TO_ADD_LARGE);
    }
  };

  return (
    <section className="movies-list">
      <ul className="movies-list__container">
        {movies.slice(0, cardsToShow).map((movie) => (
             <MoviesCard key={movie.id || movie._id} 
             movie={movie}
             isSaved={isSaved}
             saveMovie={saveMovie}
             removeMovie={removeMovie}
             />
        ))}
      </ul>
      {cardsToShow < movies.length && (
        <button
         type="button"
          className="movies-list__still"
          onClick={handleShowMore}
          >
          Еще  
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
