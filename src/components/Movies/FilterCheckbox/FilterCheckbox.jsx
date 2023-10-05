import { useState } from "react";
import "./FilterCheckbox.css"

const FilterCheckbox = ({ onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
    onChange()
  }

  return (
<div className="checkbox" onClick={handleClick}>  
    <label className={`checkbox__click ${isChecked ? "checkbox__click_active" : ""}`}>
      <span className="checkbox__circle"></span>
    </label>
    <p className="checkbox__change-title">Короткометражки</p>
    </div> 
  );
}

export default FilterCheckbox;