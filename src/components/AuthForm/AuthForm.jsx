import "./AuthForm.css"
import Logo from "../HeaderLogo/Logo";
import AuthButton from "../AuthButton/AuthButton";
import { useNavigate } from "react-router-dom";
const AuthForm = ({ title, buttonText, children, isValid }) => {
  
const navigateMovie = useNavigate();
  function handleSubmit(evt) {
    evt.preventDefault();
    navigateMovie("/movies")
  }

  return (
    <section className="auth">
      <Logo />
      <form onSubmit={handleSubmit}>
      <h1 className="auth__title">{title}</h1>
        <div className="auth__inputs-container">{children}</div>
        <AuthButton 
        buttonText={buttonText}
        isValid={isValid} 
        />
      </form>
    </section>
  );
};

export default AuthForm;