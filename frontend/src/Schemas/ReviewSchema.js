import * as yup from 'yup';

export const ReviewSchema = yup.object().shape({
  comment: yup.string().max(250, 'Max character is 250.'),
  rating: yup.number().min(1, 'Minimum rating is 1').max(10, 'Maximum rating is 10').required('Rating field is required!'),
});
