import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
import SearchForm from '../Movies/SearchForm/SearchForm';
import poster from "../../images/временный постер movie.jpg";
import poster2 from "../../images/постер временный для проверки верстки.jpg";
import poster3 from "../../images/временный постер 3.jpg";

function SavedMovies(){
  //временный массив 
  const savedMovies = [
    { id: 1, title: "Сохраненный фильм 1", duration: "1.11 мин", poster: poster, isDelete: true },
    { id: 2, title: "Сохраненный фильм 2", duration: "1.28 мин", poster: poster3, isDelete: true},
    { id: 3, title: "Сохраненный фильм 3", duration: "1.43 мин", poster: poster2, isDelete: true},
  ];

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        <div className="movies-list">
          <ul className="movies-list__container">
            {savedMovies.map((movie) => (
              <MoviesCard key={movie.id} movie={movie} />
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;