import * as yup from 'yup';

export const mealKitSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter a valid name, do not use special characters')
    .max(40, 'Max character is 40')
    .required('Name is required'),
  description: yup.string().max(500, 'Max character is 500').required('Description is required'),
  subTxt: yup.string().max(40, 'Max character is 40').required('Sub text is required'),
  price: yup.number().min(0, 'Please enter a valid price amount').max(200, 'Do not exaggerate').required('Price info is required'),
});
