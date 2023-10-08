import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import SearchForm from '../Movies/SearchForm/SearchForm';

import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import { useState } from 'react';
import { useContext } from 'react';
import { MoviesContext } from '../Contexts/MovieContext';
import { filterMovies } from '../../utils/filterMovies';
import { useMemo } from 'react';

function SavedMovies() {
  const { savedMovies } = useContext(MoviesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [formError, setFormError] = useState(null);

  const filteredMovies = useMemo(() => filterMovies(savedMovies, searchTerm, isChecked), [savedMovies, searchTerm, isChecked]);

  function handleSearch(term, isChecked) {
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
          onError={setFormError}
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


