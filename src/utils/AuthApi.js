const BASE_URL = "http://localhost:3000";
// const BASE_URL = 'https://aldonmovie.nomoredoma.nomoredomainsicu.ru';


function checkResponseStatus(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка ${res.status}`);
}

export async function register (data){
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",

    headers: { "Content-Type": "application/json",
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
   },
    body: JSON.stringify(data),
  });
  return checkResponseStatus(res);
};

export async function authorize(data) {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",

    headers: { "Content-Type": "application/json",
    'Authorization': `Bearer ${localStorage.getItem('jwt')}` },
    body: JSON.stringify(data),
  });
  return checkResponseStatus(res);
};

const AuthApi = {
  register,
  authorize
}

export default AuthApi;