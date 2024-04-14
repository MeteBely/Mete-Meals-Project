import * as yup from 'yup';
const emailRegExp = /\w+@\w+\.[a-zA-Z]{2,}/g;

export const loginSchema = yup.object().shape({
  email: yup.string().matches(emailRegExp, 'Please enter a valid email').email('Please enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});
