import "./FilterCheckbox.css"
import React, { useState } from 'react';

const FilterCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
  }

  return (
<div className="checkbox">  
    <label className={`checkbox__click ${isChecked ? "checkbox__click_active" : ""}`}
      onClick = {handleClick} >
      <span className="checkbox__circle"></span>
    </label>
    <p className="checkbox__change-title">Короткометражки</p>
    </div> 
  );
}

export default FilterCheckbox;