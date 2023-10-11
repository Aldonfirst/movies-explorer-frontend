
import MyInput from '../MyInput/MyInput';
import AuthForm from '../AuthForm/AuthForm';
import useValidationHook from "../../hooks/useValidationHook";
import { useContext } from 'react';
import { CurrentUserContext } from '../../Contexts/UserСontext';
import { MIN_LENGTH_PASSWORD } from '../config/config';

function Login() {
  const { values, handleChange, errors, isValid, resetForm, handleBlur } = useValidationHook({ email: '', password: '' });
  const { apiErrMsg, handleAuthorize, setApiErrMsg, successfullyMessage } = useContext(CurrentUserContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    handleAuthorize(values)
      .then(() => resetForm())
      .catch((err) => {
        console.log(err);
        setApiErrMsg(err.message);
      });
  };

  return (
    <main>
      <AuthForm
        handleSubmit={handleSubmit}
        title="Рады видеть!"
        buttonText="Войти"
        isValid={isValid}
        errorMsg={apiErrMsg}
        successMsg={successfullyMessage}
      >
        <MyInput
          name="email"
          type="email"
          placeholder="Введите e-mail"
          value={values.email || ""}
          onChange={handleChange}
          error={errors.email}
          htmlFor="E-mail"
          onBlur={handleBlur}
        />
        <MyInput
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={values.password || ""}
          onChange={handleChange}
          error={errors.password}
          htmlFor="Пароль"
          onBlur={handleBlur}
          minLength={MIN_LENGTH_PASSWORD}
        />
      </AuthForm>
    </main>
  );
};

export default Login;
