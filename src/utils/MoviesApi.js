const base_url = 'https://api.nomoreparties.co/beatfilm-movies'

function getResponse(res) {
  return res.json().then((json) => {
    return res.ok ? json : Promise.reject(json)
  })
}

export function getMovies(){
  return fetch(`${base_url}`).then((res) => getResponse(res))
}