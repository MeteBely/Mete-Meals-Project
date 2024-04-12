import * as yup from 'yup';
const emailRegExp = /\w+@\w+\.[a-zA-Z]{2,}/g;

export const userEditSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Lütfen gecerli bir isim giriniz, özel karakterler kullanmayiniz')
    .max(15, 'Maksimum 15 karakter girilebilir')
    .required('İsim zorunludur'),
  email: yup.string().matches(emailRegExp, 'Lutfen geçerli bir email giriniz').email('Lutfen geçerli bir email giriniz').required('Email zorunludur'),
  isAdmin: yup.boolean(),
});
