import { emailRegex } from "../constants/constants";
import "./MyInput.css"

function MyInput ({ name, type, placeholder, value, onChange, error,htmlFor }) {
  return (
    <div>
      <label className="myInput__signature">{htmlFor}</label>
      <input
            className={`myInput ${error ? 'myInput_invalid' : ''}`}
            autoComplete="off"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        minLength="3"
        maxLength="30"
        pattern={emailRegex.source}
        required
      />
      <span className="myInput__error">{error}</span>
    </div>
  );
};
export default MyInput;
