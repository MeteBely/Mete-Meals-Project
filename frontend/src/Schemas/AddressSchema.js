import * as yup from 'yup';

export const addressSchema = yup.object().shape({
  address: yup.string().max(120, 'Max character is 120').required('Address info is required'),
  city: yup.string().max(20, 'Max character is 20').required('City info is required'),
  postalCode: yup.string().max(10, 'Max character is 10').required('Postal code info is required'),
});
