
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState } from "react";
import "./MoviesCardList.css"
function MoviesCardList({movies}){
//временное добавление требует доработок по адаптиву
  const [cardsToShow, setCardsToShow] = useState(16);

  const handleShowMore = () => {
    setCardsToShow(cardsToShow + 4);
  };
  
  return (
    <div className ="movies-list">
      <ul className="movies-list__container">
        {movies.slice(0, cardsToShow).map((movie) => (
          <MoviesCard key={movie.id} movie={movie} />
        ))}
      </ul>
      {cardsToShow < movies.length &&
       <button 
       className ="movies-list__still"
       onClick={handleShowMore}>Еще</button>}
    </div>
  );
};

export default MoviesCardList;


