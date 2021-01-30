import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
// import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const SetupsForm = ({ handleFilterData }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Filter results
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Formik
            initialValues={{ titile: '', date: '', author: '', tags: '' }}
            validate={() => { }}
            onSubmit={async (values, { setSubmitting }) => {
              await handleFilterData(values)
              setSubmitting(false)
            }}
          >
            {({ isSubmitting, handleReset }) => (
              <Form>
                <Field style={{ paddingRight: 15 }} as={TextField} label="Title" type="title" name="title" />
                <ErrorMessage name="title" component="div" />
                <Field style={{ paddingRight: 15, marginTop: "16px" }} as={TextField} type="date" name="date" />
                <ErrorMessage name="date" component="div" />
                <Field style={{ paddingRight: 15 }} as={TextField} label="Author" type="author" name="author" />
                <ErrorMessage name="author" component="div" />
                <Field style={{ paddingRight: 15 }} as={TextField} label="Tags" type="tags" name="tags" />
                <ErrorMessage name="tags" component="div" />
                <Button style={{ marginLeft: 30, marginRight: 10 }} variant="contained" color="secondary" onClick={handleReset}>
                  Reset
                </Button>
                <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                  Search
                </Button>
              </Form>
            )}
          </Formik>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

SetupsForm.propTypes = {
  handleFilterData: PropTypes.any
}

export default SetupsForm
