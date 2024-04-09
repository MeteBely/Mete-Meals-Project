import * as yup from 'yup';

export const MealKitSchema = yup.object().shape({
  // companyName: yup
  //   .string()
  //   .matches(/^[A-Za-z ]*$/, 'Lütfen gecerli bir sirket ismi giriniz, özel karakterler kullanmayiniz')
  //   .max(80, 'Maksimum 40 karakter girilebilir')
  //   .required('Şirket adi zorunludur'),
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Lütfen gecerli bir isim giriniz, özel karakterler kullanmayiniz')
    .max(40, 'Maksimum 40 karakter girilebilir')
    .required('İsim zorunludur'),
  description: yup.string().max(500, 'Maksimum 500 karakter girilebilir').required('Aciklama alani zorunludur'),
  subTxt: yup.string().max(40, 'Maksimum 40 karakter girilebilir').required('subTxt zorunludur'),
  price: yup.number().min(0, 'Gecerli bir fiyat giriniz.').max(200, 'Abartma.').required('Fiyat bölümü girilmesi zorunludur.'),
});
