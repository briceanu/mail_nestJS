import style from './app.module.scss';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import { basicSchema } from './schemas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsEnvelopeFill } from 'react-icons/bs';
import { useState } from 'react';

const API_BASE = 'http://localhost:3001';

function App() {
  const [isAnimating, setIsAnimating] = useState(false);

  const onSubmit = async (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => {
    const { resetForm, setSubmitting } = formikHelpers;
    setSubmitting(true);
    const { first_name, last_name, email, message } = values;
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error(error);
    }
    setIsAnimating(true);
    const notify = () =>
      toast.success('Message sent!', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    resetForm();
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
    setTimeout(() => {
      notify();
    }, 2000);
    setSubmitting(false);
  };

  const {
    touched,
    isSubmitting,
    handleBlur,
    errors,
    handleChange,
    values,
    handleSubmit,
  } = useFormik<FormikValues>({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      message: '',
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <>
      <div className={style.header_container}>
        <h1 className={style.header}>keep in touch</h1>
        <BsEnvelopeFill
          className={` ${style.envelop}  ${
            isAnimating ? style.myAnimatedEnvelop : ''
          }`}
        />
      </div>
      <form className={style.form} onSubmit={handleSubmit} autoComplete='off'>
        <input
          type='text'
          id='first_name'
          name='first_name'
          placeholder='first name'
          value={values.first_name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${style.first_name} ${
            errors.first_name && touched.first_name && style.input_error
          }`}
        />

        {errors.first_name && touched.first_name && (
          <p className={style.error}>{String(errors.first_name)}</p>
        )}

        <input
          type='text'
          id='last_name'
          name='last_name'
          placeholder='last name'
          value={values.last_name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${style.last_name} ${
            errors.last_name && touched.last_name && style.input_error
          }`}
        />
        {errors.last_name && touched.last_name && (
          <p className={style.error}>{String(errors.last_name)}</p>
        )}

        <input
          type='email'
          id='email'
          name='email'
          placeholder='Enter your email'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${style.input} ${
            errors.email && touched.email && style.input_error
          }`}
        />
        {errors.email && touched.email && (
          <p className={style.error}>{String(errors.email)}</p>
        )}
        <textarea
          name='message'
          id='message'
          cols={30}
          rows={10}
          placeholder='your message'
          value={values.message}
          onChange={handleChange}
        ></textarea>
        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <ToastContainer />
      </form>
    </>
  );
}
export default App;
