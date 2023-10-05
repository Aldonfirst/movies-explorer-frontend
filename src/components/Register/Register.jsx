import AuthForm from '../AuthForm/AuthForm';
import MyInput from '../MyInput/MyInput';
import "./Register.css";
import useValidationHook from "../../hooks/useValidationHook";
import { CurrentUserContext } from '../contexts/Сontexts';
import { useContext } from 'react';

function Register() {
  const { values, errors, handleChange, isValid, resetForm }
    = useValidationHook({ email: '', name: '', password: '' });

  const { apiErrMsg, handleRegister } = useContext(CurrentUserContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister({
      name: values.userName,
      email: values.email,
      password: values.password
    })
      .then(() => resetForm())
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <AuthForm
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        isValid={isValid}
        handleSubmit={handleSubmit}
        error={apiErrMsg}
      >
        <MyInput
          name="userName"
          type="text"
          placeholder="Введите ваше имя"
          value={values.userName || ""}
          onChange={handleChange}
          error={errors.userName}
          htmlFor="Имя"
        />
        <MyInput
          name="email"
          type="email"
          placeholder="Введите e-mail"
          value={values.email || ""}
          onChange={handleChange}
          error={errors.email}
          htmlFor="E-mail"
        />
        <MyInput
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={values.password || ""}
          onChange={handleChange}
          error={errors.password}
          htmlFor="Пароль"
        />
      </AuthForm>
    </main>
  );
};

export default Register;