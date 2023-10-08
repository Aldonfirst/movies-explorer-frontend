import { Route, Routes } from 'react-router-dom';
import './App.css'
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound404 from '../NotFound404/NotFound404';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserProvider from '../Contexts/UserСontext';
import { MoviesProvider } from '../Contexts/MovieContext';

//Все обработчики запросов вложены в свои контексты для удобства и очистки файла App
function App() {
  return (
    <div className="page">
      <CurrentUserProvider>
        <MoviesProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="*" element={<NotFound404 />} />
            <Route path="/movies" element={<ProtectedRoute element={Movies} />} />
            <Route path="/saved-movies" element={<ProtectedRoute element={SavedMovies} />} />
            <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
          </Routes>
        </MoviesProvider>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
