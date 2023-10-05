// const BASE_URL = 'http://localhost:3000';
 const BASE_URL = 'https://aldonmovie.nomoredoma.nomoredomainsicu.ru';

const checkResponseStatus = async (response) => {
  if (response.ok) {
    return response.json();
  }
  let errorData = {};
  try {
    errorData = await response.json();
  } catch (err) {
    console.error('Error:', err);
  }
  if (errorData.message) {
    throw new Error(errorData.message);
  } else {
    throw new Error(`Error: ${response.status}`);
  }
};

export async function getUser (token) {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token || localStorage.getItem('jwt')}`
    },
  });
  return checkResponseStatus(res);
};

export async function updateUser(user) {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email
    }),
  });
  return checkResponseStatus(res);
};

export const getMovies = async () => {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
  });
  return checkResponseStatus(res);
};

export const addMovieToFavorite = async (movie) => {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
      movieId: movie.id
    }),
  });
  return checkResponseStatus(res);
};

export const removeMovieFromFavorite = async (id) => {
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
  });
  return checkResponseStatus(res);
};

const MainApi = {
  getUser,
  updateUser,
  getMovies,
  addMovieToFavorite,
  removeMovieFromFavorite,
};

export default MainApi;
