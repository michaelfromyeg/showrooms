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
import SearchIcon from '@material-ui/icons/Search';

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
          expandIcon={<SearchIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Filter results
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                <Field as={TextField} label="Setup tags" type="setupType" name="setupTags" />
                <ErrorMessage name="setupTags" component="div" />
                <Field as={TextField} label="Author" type="author" name="author" />
                <ErrorMessage name="author" component="div" />
                <Field as={TextField} label="Author" type="author" name="author" />
                <ErrorMessage name="author" component="div" />
                <Button type="submit" disabled={isSubmitting}>
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
