
function getResponse(res) {
  return res.json().then((json) => {
    return res.ok ? json : Promise.reject(json)
  })
}

export function getMovies(){
  return fetch('https://api.nomoreparties.co/beatfilm-movies').then((res) => getResponse(res))
}