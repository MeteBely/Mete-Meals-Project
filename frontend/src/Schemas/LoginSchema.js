import * as yup from 'yup';
const emailRegExp = /\w+@\w+\.[a-zA-Z]{2,}/g;

export const loginSchema = yup.object().shape({
  email: yup.string().matches(emailRegExp, 'Lutfen geçerli bir email giriniz').email('Lutfen geçerli bir email giriniz').required('Email zorunludur'),
  password: yup.string().required('Sifre zorunludur'),
});
