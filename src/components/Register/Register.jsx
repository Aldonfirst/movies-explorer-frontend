import AuthForm from '../AuthForm/AuthForm';
import MyInput from '../MyInput/MyInput';
import "./Register.css";
import useValidationHook from "../../hooks/useValidationHook";

function Register(){
  const { values, errors, handleChange,isValid } = useValidationHook();

  return (
    <AuthForm
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      isValid={isValid}
    >
      <MyInput
        name="userName"
        type="text"
        placeholder="Имя"
        value={values.userName || ""}
        onChange={handleChange}
        error={errors.userName}
      />
      
      <MyInput
        name="email"
        type="email"
        placeholder="E-mail"
        value={values.email || ""}
        onChange={handleChange}
        error={errors.email}
      />
    
      <MyInput
        name="password"
        type="password"
        placeholder="Пароль"
        value={values.password || ""}
        onChange={handleChange}
        error={errors.password}
      />
       
    </AuthForm>
  );
};

export default Register;