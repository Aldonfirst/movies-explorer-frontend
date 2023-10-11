
import "./FilterCheckbox.css"

const FilterCheckbox = ({ onChange, isChecked }) => {

  return (
    <div className="checkbox" onClick={()=> onChange()}>
      <label className={`checkbox__click ${isChecked ? "checkbox__click_active" : ""}`}>
        <span className="checkbox__circle"></span>
      </label>
      <p className="checkbox__change-title">Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;