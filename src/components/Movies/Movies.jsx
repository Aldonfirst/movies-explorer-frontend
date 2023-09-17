import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import poster from "../../images/временный постер movie.jpg";
import poster2 from "../../images/постер временный для проверки верстки.jpg";
import poster3 from "../../images/временный постер 3.jpg"
import { useState } from "react";
import { useEffect } from "react";
import Preloader from "../Preloader/Preloader";

function Movies() {
  //временный массив  на время верстки
  const movies = [
    { id: 1, title: "Фильмец 1 Смешной постер: Приключения алкашей  за Пивом Живым", duration: "1.11 мин" , poster: poster },
    { id: 2, title: "Фильмец 2", duration: "1.28 мин" , poster: poster3 },
    { id: 3, title: "Фильмец 3 Гарри Поттер и зло в Хогвардсе", duration: "1.43 мин" , poster: poster2 },
    { id: 4, title: "Фильмец 4", duration: "1.24 мин" , poster: poster },
    { id: 5, title: "Фильмец 5 ", duration: "1.55 мин" , poster: poster3 },
    { id: 6, title: "Фильмец 6 Смешной постер: Гарри Поттер и Голубцы в Хогвардсе", duration: "1.36 мин" , poster: poster2 },
    { id: 7, title: "Фильмец 7", duration: "1.11 мин" , poster: poster },
    { id: 8, title: "Фильмец 8", duration: "1.41 мин" , poster: poster },
    { id: 9, title: "Фильмец 9", duration: "1.11 мин" , poster: poster3 },
    { id: 10, title: "Фильмец 10", duration: "1.11 мин" , poster: poster2 },
    { id: 11, title: "Фильмец 11", duration: "1.17 мин" , poster: poster },
    { id: 12, title: "Фильмец 12", duration: "1.21 мин" , poster: poster },
    { id: 13, title: "Фильмец 13", duration: "55 мин" , poster: poster },
    { id: 14, title: "Фильмец 14", duration: "23 мин" , poster: poster2 },
    { id: 15, title: "Фильмец 15", duration: "1.01 мин" , poster: poster3 },
    { id: 16, title: "Фильмец 16", duration: "1.18 мин" , poster: poster },
    { id: 17, title: "Фильмец 17", duration: "1.00 мин" , poster: poster2 },
    { id: 18, title: "Фильмец 18", duration: "1.30 мин" , poster: poster },
    { id: 19, title: "Фильмец 19", duration: "1.14 мин" , poster: poster3 },
  ];
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, []);
  
    return (
      <>
        <main className='movies'>
          <Header />
          <SearchForm />
  
          {isLoading ? <Preloader /> : <MoviesCardList movies={movies} />}
        </main>
        <Footer />
      </>
    );
  }
  
  export default Movies;

