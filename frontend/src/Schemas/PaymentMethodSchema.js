import * as yup from 'yup';

export const PaymentMethodSchema = yup.object().shape({
  paymentMethod: yup.string().required('PaymentMethod is a required field!'),
});
