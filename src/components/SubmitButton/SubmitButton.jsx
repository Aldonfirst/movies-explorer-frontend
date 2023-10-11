import "./SubmitButton.css"
import { Link } from "react-router-dom";


const SubmitButton = ({ buttonText, isValid }) => {
    return (
      <>
        <button
          className={`auth__submit-button ${!isValid && "auth__submit-button_disabled"}`}
          type="submit"
          disabled={!isValid}
        >
          {buttonText}
        </button>
        <p className="auth__link-text">
          {buttonText === "Зарегистрироваться" ? (
            <span>
              Уже зарегистрированы?&ensp;
              <Link to="/signin" className="auth__link">
                Войти
              </Link>
            </span>
          ) : (
            <span>
              Ещё не зарегистрированы?&ensp;
              <Link to="/signup" className="auth__link">
                Регистрация
              </Link>
            </span>
          )}
        </p>
      </>
    );
  };
  
  export default SubmitButton;