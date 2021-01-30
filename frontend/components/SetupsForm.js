import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
// import Grid from '@material-ui/core/Grid';

const SetupsForm = ({ handleFilterData }) => (
  <div>
    <h1>Filter setups</h1>
    <Formik
      initialValues={{ setupType: '', author: '' }}
      validate={() => { }}
      onSubmit={async (values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2))
        await handleFilterData(values)
        setSubmitting(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field as={TextField} label="Setup type" type="setupType" name="setupType" />
          <ErrorMessage name="setupType" component="div" />
          <br /><br />
          <Field as={TextField} label="Author" type="author" name="author" />
          <ErrorMessage name="author" component="div" />
          <br /><br />
          <Button type="submit" disabled={isSubmitting}>
            Search
          </Button>
          <br /><br />
        </Form>
      )}
    </Formik>
  </div>
)

SetupsForm.propTypes = {
  handleFilterData: PropTypes.any
}

export default SetupsForm
