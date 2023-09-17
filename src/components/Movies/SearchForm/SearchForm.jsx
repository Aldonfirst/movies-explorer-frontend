import React from "react";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css"

function SearchForm() {
    return (
      <form className="search-form">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
        />
        <button className="search-form__button" type="submit" >
          Найти
        </button>
        <hr className="search-form__divider"/>
        <FilterCheckbox />
      </form> 
    );
  };
  
  export default SearchForm;
