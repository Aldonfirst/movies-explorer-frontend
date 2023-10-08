
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";
import "./MoviesCardList.css";
import useResizeHook from "../../../hooks/useResizeHook";
import { MoviesContext } from "../../Contexts/MovieContext";
import { useContext } from "react";

function MoviesCardList({ isSaved,movies }) {
  const { saveMovie, removeMovie } = useContext(MoviesContext);
  const windowWidth = useResizeHook();
  const [cardsToShow, setCardsToShow] = useState(16);

  useEffect(() => {
    if (windowWidth >= 1280 || (windowWidth >= 1250 && windowWidth)) {
      setCardsToShow(16);
    } else if (windowWidth >= 990 && windowWidth < 1250) {
      setCardsToShow(12);
    } else if (windowWidth >= 690 && windowWidth < 990) {
      setCardsToShow(8);
    } else if (windowWidth >= 300 && windowWidth < 690) {
      setCardsToShow(5);
    }
  }, [windowWidth]);

  const handleShowMore = () => {
    if (windowWidth >= 300 && windowWidth < 690) {
      setCardsToShow(cardsToShow + 1);
      }else if (windowWidth >= 690 && windowWidth < 990) {
        setCardsToShow(cardsToShow + 2);
      }else if (windowWidth >= 990 && windowWidth < 1250) {
        setCardsToShow(cardsToShow + 3);
    } else {
      setCardsToShow(cardsToShow + 4);
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
