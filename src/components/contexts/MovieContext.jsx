import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "./Сontexts";
import { useCallback } from "react";
import { createContext } from "react";
import api from "../../utils/MainApi";
import MainApi from "../../utils/MainApi";

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
         
        } catch (error) {
          setError(error);
        }
      };
      fetchSavedMovies();
    }
  }, [currentUser]);
 // Функция для сохранения фильма по лайку на страницу SavedMovies
  const saveMovie = useCallback(async(movie) => {
    try {
      const data = await api.addMovieToFavorite(movie);
      setSavedMovies((saved) => [...saved, data]);
      return data;
    } catch (error) {
      setError(error);
    }
  }, []);
 // Функция для удаления фильма из станицы SavedMovies
  const removeMovie = useCallback(async (id) => {
    try {
      await api.removeMovieFromFavorite(id);
      setSavedMovies((saved) => saved.filter((movie) => movie._id !== id));
    } catch (error) {
      setError(error);
    }
  }, []);

  return (
    <MoviesContext.Provider value={{ savedMovies, saveMovie, removeMovie, error }}>
      {children}
    </MoviesContext.Provider>
  );
}
