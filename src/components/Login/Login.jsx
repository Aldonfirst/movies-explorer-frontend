
import MyInput from '../MyInput/MyInput';
import AuthForm from '../AuthForm/AuthForm';
import useValidationHook from "../../hooks/useValidationHook";

const Login = () => {
  const { values, handleChange,errors,isValid } = useValidationHook();

  return (
    <main>
    <AuthForm
      title="Рады видеть!"
      buttonText="Войти"
      isValid={isValid}
      
    >
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

export default Login;