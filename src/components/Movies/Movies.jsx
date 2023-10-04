import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../contexts/Сontexts";
import { useContext } from "react";
import { MoviesContext } from "../contexts/MovieContext";
import { getMovies } from "../../utils/MoviesApi";
import { useCallback } from "react";
import { filterMovies } from "../../utils/filterMovies";

function Movies() {
  const { savedMovies, saveMovie, removeMovie, error } = useContext(MoviesContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [hasNotSearch, setHasNotSearch] = useState(false);
  //  функция для получения и фильтрации фильмов
  const fetchMovies = useCallback(async (searchTerm = '', isChecked = false) => {
    if (!currentUser) {
      return;
    }
    setIsLoading(true);
    setFormError("");
    try {
      // Получаю фильмы из локального хранилища или с сервера
      let data;
      const initialMovies = JSON.parse(localStorage.getItem('movies'));
      if (!initialMovies) {
        data = await getMovies();
        localStorage.setItem('movies', JSON.stringify(data));
      } else {
        data = initialMovies;
      }

      // Фильтрация фильмов по поисковому запросу и чекбоксу
      const filteredMovies = filterMovies(data, searchTerm, isChecked);
      setFetchedMovies(filteredMovies);
      // Сохранение поискового запроса и состояния чекбокса в локальном хранилище
      localStorage.setItem('searchKeyword', searchTerm);
      localStorage.setItem('isChecked', JSON.stringify(isChecked));
      setHasNotSearch(true);
    } catch (error) {
      setFormError(error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [currentUser]);
  // useEffect для восстановления состояния при монтировании компонента
  useEffect(() => {
    const savedSearch = localStorage.getItem('searchKeyword');
    const savedCheckbox = JSON.parse(localStorage.getItem('isChecked'));
    if (savedSearch || savedCheckbox) {
      setSearchKeyword(savedSearch);
      setIsChecked(savedCheckbox);
      fetchMovies(savedSearch, savedCheckbox);
    }
  }, [currentUser, fetchMovies]);
  // Функция для проверки, сохранен ли фильм
  const isSaved = (movie) => savedMovies.find((mov) => mov._id === movie._id);

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm
          onSubmit={fetchMovies}
          searchTerm={searchKeyword}
          isChecked={isChecked}
          onError={setFormError}
        />
        {isLoading ? (
          <Preloader />
        ) : error ? (
          <p className="movies__whatHappened">{error.message}</p>
        ) : formError ? (
          <p>{formError}</p>
        ) : hasNotSearch && fetchedMovies.length === 0 ? (
          <span className="movies__whatHappened">"Ничего не найдено" &#129335;&#128583;</span>
        ) : (
          <MoviesCardList
            movies={fetchedMovies}
            isSaved={isSaved}
            saveMovie={saveMovie}
            removeMovie={removeMovie}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
