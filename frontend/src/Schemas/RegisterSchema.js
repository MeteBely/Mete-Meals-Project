import * as yup from 'yup';
const emailRegExp = /\w+@\w+\.[a-zA-Z]{2,}/g;

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Lütfen gecerli bir isim giriniz, özel karakterler kullanmayiniz')
    .max(40, 'Maksimum 40 karakter girilebilir')
    .required('İsim zorunludur'),
  email: yup.string().matches(emailRegExp, 'Lutfen geçerli bir email giriniz').email('Lutfen geçerli bir email giriniz').required('Email zorunludur'),
  password: yup.string().required('Sifre zorunludur'),
  confirmPassword: yup.string().required('Sifre tekrari zorunludur'),
});
