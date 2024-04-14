import * as yup from 'yup';
const emailRegExp = /\w+@\w+\.[a-zA-Z]{2,}/g;

export const userEditSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter a valid name, do not use special characters')
    .max(15, 'Max character is 15')
    .required('Name is required'),
  email: yup.string().matches(emailRegExp, 'Please enter a valid email').email('Please enter a valid name').required('Email is required'),
  isAdmin: yup.boolean(),
});
