import "./AuthForm.css"
import Logo from "../HeaderLogo/Logo";

import SubmitButton from "../SubmitButton/SubmitButton";

function AuthForm({ handleSubmit, title, buttonText, children, isValid, errorMsg, isEmailValid,successMsg }) {

  return (
    <section className="auth">
      <Logo />
      <form className="auth__form"
      onSubmit={handleSubmit}
       noValidate>
        <h1 className="auth__title">{title}</h1>
        <div className="auth__inputs-container">
          {children}
        </div>
      
        <span className="auth__error">{errorMsg || successMsg}</span>
        <SubmitButton
          buttonText={buttonText}
          isValid={isValid}
          isEmailValid={isEmailValid} />
      </form>
    </section>
  );
};

export default AuthForm;