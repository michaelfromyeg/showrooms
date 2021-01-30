import React from 'react';
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';

const UserProfile = ({ user }) => (
  <div>
    <h1>Edit your profile</h1>
    <Formik
      initialValues={{ email: user.email, name: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field as={TextField} type="email" name="email" disabled />
          <ErrorMessage name="email" component="div" />
          <Field as={TextField} type="name" name="name" />
          <ErrorMessage name="name" component="div" />
          <Button type="submit" disabled={isSubmitting}>
            Update
           </Button>
        </Form>
      )}
    </Formik>
  </div>
);

UserProfile.propTypes = {
  user: PropTypes.any,
}

export default UserProfile;