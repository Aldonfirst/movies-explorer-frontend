import { useState, useCallback } from "react";


function useValidationHook() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validate = useCallback((name, value) => {
    if (name === 'name') {
      if (!value.match(/^[A-Za-zА-Яа-я0-9]+$/)) {
        return 'Имя должно содержать только буквы и допускаются цифры';
      } else if (value.length < 2) {
        return 'Имя должно содержать не менее 2 символов';
      }
    }

    if (name === 'email') {
      if (!value) {
        return 'Почта должна быть заполнена';
      } else if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return 'Некорректный формат адреса почты';
      }
    }

    if (name === 'password') {
      if (!value) {
        return 'Пароль должен быть заполнен';
      } else if (value.length < 3) {
        return 'Пароль должен содержать не менее 3 символов';
      }
    }

    return '';
  }, []);

  const handleChange = useCallback((evt) => {
    const { target } = evt;
    const { name, value } = target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    const error = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setIsValid(target.closest("form").checkValidity());
  }, [validate]);

  const handleBlur = handleChange;

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, []);

  return { values, handleChange, handleBlur, errors, isValid, resetForm, setValues, setIsValid };
}

export default useValidationHook;