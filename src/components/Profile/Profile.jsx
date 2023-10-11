import "./Profile.css"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import useValidationHook from "../../hooks/useValidationHook";
import { useContext } from "react";
import { useEffect } from "react";
import MainApi from "../../utils/MainApi";
import { useCallback } from "react";
import { CurrentUserContext } from "../../Contexts/UserСontext";
import { MAX_LENGTH, MIN_LENGTH, WAIT_MESSAGE } from "../config/config";

function Profile() {
  const { currentUser, setCurrentUser, handleSignOut,
    apiErrMsg, setApiErrMsg, successfullyMessage, setSuccessfullyMessage } = useContext(CurrentUserContext);
    
  const [isEditing, setIsEditing] = useState(false);
  const { values, handleChange, errors, isValid, resetForm, handleBlur }
    = useValidationHook({ email: currentUser?.name || '', password: currentUser?.email || '' });

  const [initialValues, setInitialValues] = useState({ name: currentUser?.name || '', email: currentUser?.email || '' });
  
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  useEffect(() => {
    if (currentUser) {
      resetForm({
        name: currentUser.name,
        email: currentUser.email,
      }, {}, false);
      setInitialValues({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [currentUser, resetForm]);


  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (values.name === initialValues.name && values.email === initialValues.email) {
      setApiErrMsg("Данные не были изменены!");
      return;
    }
    if (!values.name || !values.email) {
      setApiErrMsg("При обновлении профиля произошла ошибка.");
      return;
    }
    try {
      await MainApi.updateUser(values);
      setCurrentUser({ name: values.name, email: values.email });
      setIsEditing(false);
      resetForm();
      setSuccessfullyMessage('Профиль успешно обновлен!');
      setIsMessageVisible(true);
      setTimeout(() => {
        setSuccessfullyMessage('');
        setIsMessageVisible(false);
      },WAIT_MESSAGE );
      setInitialValues({ name: values.name, email: values.email });
    } catch (error) {
      setApiErrMsg(error.message);
    } finally {
      setTimeout(() => setApiErrMsg(""), WAIT_MESSAGE);
    }
  },
    [setCurrentUser, values, resetForm, setApiErrMsg, initialValues, setSuccessfullyMessage]);

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
                  onBlur={handleBlur}
                  minLength={MIN_LENGTH}
                  maxLength={MAX_LENGTH}
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
                  minLength={MIN_LENGTH}
                  maxLength={MAX_LENGTH}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`profile__input${isEditing ? ' profile__input_active' : ''}`}
                  disabled={!isEditing}
                  required
                />
              </li>
              <span className="profile__error">{errors.email}</span>
            </ul>

            {isEditing || isMessageVisible ? (
              <div className="profile__button-container">
                <span className="profile__successfullyMessage">{successfullyMessage}</span>
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