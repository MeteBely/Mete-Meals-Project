import * as yup from 'yup';
const emailRegExp = /\w+@\w+\.[a-zA-Z]{2,}/g;

export const UserEditSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Lütfen gecerli bir isim giriniz, özel karakterler kullanmayiniz')
    .max(20, 'Maksimum 20 karakter girilebilir')
    .required('İsim zorunludur'),
  email: yup.string().matches(emailRegExp, 'Lutfen geçerli bir email giriniz').email('Lutfen geçerli bir email giriniz').required('Email zorunludur'),
  isAdmin: yup.boolean(),
});
