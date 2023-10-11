import React, { useState, useEffect, useContext } from "react";
import { useCallback } from "react";
import { createContext } from "react";

import MainApi from "../utils/MainApi";
import { CurrentUserContext } from "./UserСontext";

export const MoviesContext = createContext([]);

export function MoviesProvider({ children }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [error, setError] = useState(null);
   const {currentUser} = useContext(CurrentUserContext);

   // Загрузка сохраненных фильмов пользователя
  useEffect(() => {
    if (currentUser) {
      const fetchSavedMovies = async () => {
        try {
          const movies = await MainApi.getMovies();
          setSavedMovies(movies);
        } catch (err) {
          setError("Ошибка вывода фильмов.Пожалуйста перезапустите страницу и попробуйте еще раз");
        }
      };
      fetchSavedMovies();
    }
  }, [currentUser]);
 // Функция для сохранения фильма по лайку на страницу SavedMovies
  const saveMovie = useCallback(async(movie) => {
    try {
      const data = await MainApi.addMovieToFavorite(movie);
      setSavedMovies((saved) => [...saved, data]);
      return data;
    } catch (err) {
      setError("Ошибка в сохранении фильма");
    }
  }, []);
 // Функция для удаления фильма из станицы SavedMovies
  const removeMovie = useCallback(async (id) => {
    try {
      await MainApi.removeMovieFromFavorite(id);
      setSavedMovies((saved) => saved.filter((movie) => movie._id !== id));
    } catch (err) {
      setError("Ошибка в удалении фильма");
    }
  }, []);

  return (
    <MoviesContext.Provider value={{ savedMovies, saveMovie, removeMovie, error }}>
      {children}
    </MoviesContext.Provider>
  );
}
