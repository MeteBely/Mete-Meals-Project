import * as yup from 'yup';

export const addressSchema = yup.object().shape({
  address: yup.string().max(120, 'Maksimum 120 karakter girilebilir').required('Address zorunludur'),
  city: yup.string().max(20, 'Maksimum 20 karakter girilebilir').required('City zorunludur'),
  postalCode: yup.string().max(10, 'Maksimum 10 karakter girilebilir').required('Postal code zorunludur'),
});
