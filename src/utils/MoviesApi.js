const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies'

function getResponse(res) {
  return res.json().then((json) => {
    return res.ok ? json : Promise.reject(json)
  })
}

export function getMovies(){
  return fetch(`${BASE_URL}`).then((res) => getResponse(res))
}