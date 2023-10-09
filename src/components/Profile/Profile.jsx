import "./Profile.css"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import useValidationHook from "../../hooks/useValidationHook";
import { useContext } from "react";
import { useEffect } from "react";

import MainApi from "../../utils/MainApi";
import { useCallback } from "react";
import { CurrentUserContext } from "../Contexts/UserСontext";


function Profile() {
  const { currentUser, setCurrentUser, handleSignOut, apiErrMsg, setApiErrMsg } = useContext(CurrentUserContext);
  const [isEditing, setIsEditing] = useState(false);
  const { values, handleChange, errors, isValid, resetForm }
   = useValidationHook({ email: currentUser?.name || '', password: currentUser?.email || '' });
  useEffect(() => {
    if (currentUser) {
      resetForm({
        name: currentUser.name,
        email:currentUser.email,
      }, {}, false);
    }
  }, [currentUser, resetForm]);

  
  const handleSubmit = useCallback (async (e) => {
    e.preventDefault();
    if (!values.name || !values.email) {
      setApiErrMsg("При обновлении профиля произошла ошибка.");
      return;
    }
    try {
      await MainApi.updateUser(values);
      setCurrentUser({ name: values.name, email: values.email });
      setIsEditing(false);
      resetForm(); 
      setApiErrMsg('Профиль успешно обновлен'); 
    } catch (error) {
      setApiErrMsg(error.message);
    } finally {
      setTimeout(() => setApiErrMsg(""), 2000);
    }
  },
  [setCurrentUser, values, resetForm, setApiErrMsg]);

  return (
    <>
      <Header />
      <main>
        <section className="profile">
          <form noValidate onSubmit={handleSubmit}>
            <h2 className="profile__title">Привет, {currentUser.name || 'Гость'}!</h2>
            <ul className="profile__inputs-wrapper">
              <li className="profile__label">
                Имя
                <input
                  type="text"
                  name="name"
                  placeholder="Имя"
                  value={values.name || ''}
                  onChange={handleChange}
                  minLength="2"
                  maxLength="30"
                  className={`profile__input${isEditing ? ' profile__input_active' : ''}`}
                  disabled={!isEditing}
                  required
                />
              </li>
              <span className="profile__error">{errors.name}</span>
              <li className="profile__label">
                E-mail
                <input
                  type="email"
                  name="email"
                  value={values.email || ''}
                  placeholder="Email"
                  minLength="2"
                  // pattern={emailRegex}
                  maxLength="30"
                  onChange={handleChange}
              
                  className={`profile__input${isEditing ? ' profile__input_active' : ''}`}
                  disabled={!isEditing}
                  required
                />
              </li>
              <span className="profile__error">{errors.email}</span>
            </ul>

            {isEditing ? (
              <div className="profile__button-container">
                <span className="profile__error_server">{apiErrMsg}</span>
                <button
                  type="submit"
                  className={`auth__submit-button ${!isValid && 'auth__submit-button_disabled'}`}
               
                  onClick={handleSubmit}
                  disabled={!isValid}
                >
                  Сохранить
                </button>
              </div>
            ) : (
              <div className="profile__button-container">
                <button
                  type="button"
                  className="profile__button"
                  onClick={() => setIsEditing(true)}
                >
                  Редактировать
                </button>
                <Link to="/" className="profile__link" onClick={handleSignOut}>
                  Выйти из аккаунта
                </Link>
              </div>
            )}
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;