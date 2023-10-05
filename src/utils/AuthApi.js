// const BASE_URL = "http://localhost:3000";
const BASE_URL = 'https://aldonmovie.nomoredoma.nomoredomainsicu.ru';

const checkResponseStatus = async (response) => {
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

export const register = async (data) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return checkResponseStatus(res);
};

export const authorize = async (data) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return checkResponseStatus(res);
};

const AuthApi = {
  register,
  authorize
}

export default AuthApi;