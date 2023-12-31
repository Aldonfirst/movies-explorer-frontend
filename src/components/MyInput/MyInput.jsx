
import { MAX_LENGTH } from "../config/config";
import "./MyInput.css"

function MyInput({ name, type, placeholder, value, onChange, error, htmlFor,onBlur }) {
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
        onBlur={onBlur}
        maxLength={MAX_LENGTH}
        required
      />
      <span className="myInput__error">{error}</span>
    </div>
  );
};
export default MyInput;
