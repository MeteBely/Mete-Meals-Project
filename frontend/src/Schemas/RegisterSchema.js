import * as yup from 'yup';
const emailRegExp = /\w+@\w+\.[a-zA-Z]{2,}/g;

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter a valid name, do not use special characters')
    .max(15, 'Max character is 15')
    .required('Name is required'),
  email: yup.string().matches(emailRegExp, 'Please enter a valid email').email('Please enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().required('Password repetition is required'),
});
