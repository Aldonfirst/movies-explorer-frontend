import { useState, useCallback } from "react";



function useValidationHook() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((evt) => {
    const { target } = evt;
    const { name, value } = target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  const handleBlur = useCallback((evt) => {
    const { target } = evt;
    const { name, value } = target;

    if (name === 'name') {
      if (!value.match(/^[A-Za-zА-Яа-я0-9]+$/)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'Имя должно содержать только буквы и допускаются цифры',
        }));
      } else if (value.length < 2) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'Имя должно содержать не менее 2 символов',
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
    }

    if (name === 'email') {
      if (!value) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: 'Почта должна быть заполнена' }));
      } else if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'Некорректный формат адреса почты',
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
    }

    if (name === 'password') {
      if (!value) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: 'Пароль должен быть заполнен' }));
      } else if (value.length < 3) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'Пароль должен содержать не менее 3 символов',
        }));
      }
      //  else if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/)) {
      //   setErrors((prevErrors) => ({
      //     ...prevErrors,
      //     [name]:
      //       'Пароль должен содержать символы верхнего и нижнего регистра, а также цифры',
      //   }));
      // }
       else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
    }
    setIsValid(target.closest("form").checkValidity());
  }, []);

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, []);

  return { values, handleChange, handleBlur, errors, isValid, resetForm, setValues, setIsValid };
}

export default useValidationHook;