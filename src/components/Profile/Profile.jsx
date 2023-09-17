import "./Profile.css"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import useValidationHook from "../../hooks/useValidationHook";

function Profile() {
  const { values, handleChange, errors, isValid, resetForm } = useValidationHook();
  const { name, email } = values;
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (evt) => {
    evt.preventDefault();
    setIsEditing(false);
    resetForm();
  };

  return (
    <section className="profile">
      <Header />
      <form >
        <h2 className="profile__title">Привет,{name}!</h2>
        <ul className="profile__inputs-wrapper">
          <li className="profile__label">Имя
            <input
              type="text"
              name="name"
              placeholder="Имя"
              value={name}
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              className={`profile__input${isEditing ? " profile__input_active" : ""}`}
              disabled={!isEditing}
              required
            />
          </li>
          <span className="profile__error">{errors.name}</span>
          <li className="profile__label">E-mail
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              minLength="2"
              maxLength="30"
              onChange={handleChange}
              className={`profile__input${isEditing ? " profile__input_active" : ""}`}
              disabled={!isEditing}
              required
            />
          </li>
          <span className="profile__error">{errors.email}</span>
        </ul>

        {isEditing ? (
          <div className="profile__button-container">
            <span className="profile__error_server">При обновлении профиля произошла ошибка.</span>
            <button type="submit" className={`auth__submit-button ${!isValid && "auth__submit-button_disabled"}`}
             onClick={handleSave} disabled={!isValid}>Сохранить</button>
          </div>
        ) : (
          <div className="profile__button-container">
            <button type="button" className="profile__button" onClick={handleEdit}>Редактировать</button>
            <Link to="/signin" className="profile__link">Выйти из аккаунта</Link>
          </div>
        )}
      </form>
    </section>
  );
};

export default Profile;