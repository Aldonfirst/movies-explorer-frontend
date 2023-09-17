
import MyInput from '../MyInput/MyInput';
import AuthForm from '../AuthForm/AuthForm';
import useValidationHook from "../../hooks/useValidationHook";

const Login = () => {
  const { values, handleChange,errors,isValid } = useValidationHook();

  return (
    <AuthForm
      title="Рады видеть!"
      buttonText="Войти"
      isValid={isValid}
    >
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

export default Login;