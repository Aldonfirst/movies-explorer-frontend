import React, { useCallback } from "react";

import "./SearchForm.css"

import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSubmit, searchKeyword, isChecked, onError, isOnSavedMoviesPage }) {
  const [input, setInput] = useState(() => {
    const savedSearch = localStorage.getItem('searchKeyword');
    return savedSearch !== null ? savedSearch : '';
  });

const [checkbox, setCheckbox] = useState(() => {
  const savedCheckbox = JSON.parse(localStorage.getItem('isChecked'));
  return savedCheckbox !== null ? savedCheckbox : false;
});
  
 // Функция для обработки изменения текстового поля
 const handleInputChange = (evt) => {
  setInput(evt.target.value);
};

// Функция для обработки изменения состояния чекбокса
const handleCheckboxChange = useCallback(() => {
  const newCheckboxState = !checkbox;
  setCheckbox(newCheckboxState);
  localStorage.setItem('isChecked', JSON.stringify(newCheckboxState));
  onSubmit(input, newCheckboxState);
}, [checkbox, input, onSubmit]);

// Функция для обработки отправки формы
const handleSubmit = (evt) => {
  evt.preventDefault();
  if (!input && !isOnSavedMoviesPage) {
    onError(
      <span className="movies__whatHappened">Введите название фильма </span>);
  } else {
    onError('');
    onSubmit(input, checkbox);
  }
};

return (
  <section>
    <form className="search-form"
    onSubmit={handleSubmit}
    noValidate
    >
      <input
        className="search-form__input"
        type="text"
        placeholder="Фильм"
        required
        name="search"
        value={input}
        onChange={handleInputChange}
      />
      <button className="search-form__button" type="submit">
        Найти
      </button>
      <hr className="search-form__divider" />
      <FilterCheckbox onChange={handleCheckboxChange} isChecked={checkbox} />
    </form>

  </section>
);
}

export default SearchForm;
