import AuthForm from '../AuthForm/AuthForm';
import MyInput from '../MyInput/MyInput';
import "./Register.css";
import useValidationHook from "../../hooks/useValidationHook";

import { useContext } from 'react';
import { CurrentUserContext } from '../../Contexts/UserСontext';


function Register() {
  const { values, errors, handleChange, isValid, resetForm, handleBlur }
    = useValidationHook({ email: '', name: '', password: '' });
  const { apiErrMsg, handleRegister } = useContext(CurrentUserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    handleRegister({
      name: values.name,
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
          name="name"
          type="text"
          placeholder="Введите ваше имя"
          value={values.name || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          htmlFor="Имя"
       
        />
        <MyInput
          name="email"
          type="email"
          placeholder="Введите e-mail"
          value={values.email || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          htmlFor="E-mail"
  
        />
        <MyInput
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={values.password || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          htmlFor="Пароль"
         
        />
      </AuthForm>
    </main>
  );
};

export default Register;