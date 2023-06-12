import * as yup from 'yup';
const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i;
export const basicSchema = yup.object().shape({
  first_name: yup
    .string()
    .required('First name required')
    .min(5, 'First name must be at least 5 charaters'),
  last_name: yup
    .string()
    .required('Last name required')
    .min(5, 'Last name must be at least 5 charaters'),
  email: yup
    .string()
    .matches(regex, { message: 'Please enter a valid email' })
    .required('Email required'),
  message: yup.string(),
});
