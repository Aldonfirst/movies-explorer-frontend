
import Preloader from "../Preloader/Preloader";
import MainApi from "../../utils/MainApi";
import AuthApi from "../../utils/AuthApi";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const CurrentUserContext = createContext({});

const CurrentUserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiErrMsg, setApiErrMsg] = useState("");

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
        const { token } = await AuthApi.authorize({
          email: data.email,
          password: data.password
        });
        localStorage.setItem("jwt", token);
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
        setCurrentUser(data);
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
