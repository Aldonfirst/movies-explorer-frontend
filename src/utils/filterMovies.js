import { FILTER_TIME } from "../components/config/config";

export function filterMovies(movies, searchTerm, isShort) {
    return movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase()) && (isShort ? movie.duration <= FILTER_TIME : true)
    );
  }