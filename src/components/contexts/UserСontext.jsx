
import Preloader from "../Preloader/Preloader";
import MainApi from "../../utils/MainApi";
import AuthApi from "../../utils/AuthApi";
import { useLocation, useNavigate } from "react-router-dom";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const CurrentUserContext = createContext({});

const CurrentUserProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiErrMsg, setApiErrMsg] = useState("");

  //Блокировка входа на страницы регистрации и авторизации если пользователь уже зашел на фильмы
  useEffect(() => {
    if (currentUser && (location.pathname === '/signin' || location.pathname === '/signup')) {
      navigate('/movies');
    }
  }, [currentUser, location, navigate]);

//Получение токена и проброс в локальное хранилище
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          const userData = await MainApi.getUser(token);
          setCurrentUser(userData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

//выход из аккаунта и сброс значений 
  function handleSignOut() {
    setCurrentUser(null);
    setApiErrMsg("");
    localStorage.removeItem('jwt');
    localStorage.removeItem('searchKeyword');
    localStorage.removeItem('isChecked');
    localStorage.removeItem('movies'); 
  }

//Функция регистрации пользователя
  async function handleRegister (data) {
      try {
        setApiErrMsg("");
        await AuthApi.register(data);
        const res = await AuthApi.authorize({
          email: data.email,
          password: data.password
        });
        localStorage.setItem("jwt", res.token);
        setCurrentUser(data);
        setApiErrMsg("");
        navigate("/movies");
      } catch (err) {
        setApiErrMsg('Ошибка регистрации');
      } 
      finally {
        setTimeout(() => setApiErrMsg(""), 2000);
      }
    }

//Функция авторизации пользователя
async function handleAuthorize(data){
  try {
    const res = await AuthApi.authorize({
      email: data.email,
      password: data.password
    });
    localStorage.setItem("jwt", res.token);
    const userData = await MainApi.getUser(res.token); 
    setCurrentUser(userData);
    navigate("/movies");
  } catch (err) {
    setApiErrMsg('Ошибка при авторизации.');
  } 
  finally {
    setTimeout(() => setApiErrMsg(""), 2000);
  }
}

  if (isLoading) {
    return <Preloader/>;
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,setCurrentUser,apiErrMsg,
        setApiErrMsg,handleSignOut,handleRegister,
        handleAuthorize,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
