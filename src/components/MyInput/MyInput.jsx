import "./MyInput.css"

function MyInput ({ name, type, placeholder, value, onChange, error }) {
  return (
    <div>
      <label className="myInput__signature">{placeholder}</label>
      <input
        className="myInput"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        minLength="2"
        maxLength="30"
        required
      />
      <span className="myInput__error">{error}</span>
    </div>
  );
};
export default MyInput;
