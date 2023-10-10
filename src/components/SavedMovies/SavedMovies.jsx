import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import { useState } from 'react';
import { useContext } from 'react';
import { filterMovies } from '../../utils/filterMovies';
import { useMemo } from 'react';
import { MoviesContext } from '../../Contexts/MovieContext';

function SavedMovies() {
  const { savedMovies } = useContext(MoviesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [formError, setFormError] = useState(null);
  const [isChecked, setIsChecked] = useState(() => {
    const savedCheckbox = JSON.parse(localStorage.getItem('savedMoviesIsChecked'));
    return savedCheckbox !== null ? savedCheckbox : false;
  });

  const filteredMovies = useMemo(() =>
   filterMovies(savedMovies, searchTerm, isChecked), [savedMovies, searchTerm, isChecked]);


  function handleSearch(term, isChecked) {
    console.log('хендл: ', term, ' and isChecked: ', isChecked);
    setSearchTerm(term);
    setIsChecked(isChecked);
  }

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm
          onSubmit={handleSearch}
          searchTerm={searchTerm || ""}
          isChecked={isChecked}
          onErrorForm = {setFormError}
          isOnSavedMoviesPage={true}
        />
        {formError &&    <span className="movies__whatHappened">{formError}</span>}
        {filteredMovies.length === 0 &&
          <span className="movies__whatHappened">Нет сохраненных фильмов</span>}
        <MoviesCardList
          movies={filteredMovies}
          isSaved={true}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;


