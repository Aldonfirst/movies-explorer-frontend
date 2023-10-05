// const BASE_URL = "http://localhost:3000";
const BASE_URL = 'https://aldonmovie.nomoredoma.nomoredomainsicu.ru';

async function checkResponseStatus(response) {
  if (response.ok) {
    return response.json();
  }

  let errorData = {};
  try {
    errorData = await response.json();
  } catch(err) {
    console.error('Error:', err);
  }

  if (errorData.message) {
    throw new Error(errorData.message);
  } else {
    throw new Error(`Error: ${response.status}`);
  }
};

export async function register (data){
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
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
    credentials: 'include',
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