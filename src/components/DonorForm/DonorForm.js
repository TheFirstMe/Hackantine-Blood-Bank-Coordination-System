import React, { useState, useEffect } from 'react';
import {  navigate } from '@reach/router';
import { Link as RouterLink} from 'gatsby'
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { getAccessToken } from "utils/auth"
import { Alert } from '@material-ui/lab'
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
  Paper,
  InputLabel,
  FormControl,
  FormHelperText,
  Select
} from '@material-ui/core';
import clsx from "clsx";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { handleLogin, isLoggedIn } from "../../utils/auth"

import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';
import {format} from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const schema = {
  // email: {
  //   presence: { allowEmpty: false, message: 'is required' },
  //   email: true,
  //   length: {
  //     maximum: 64
  //   }
  // },
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  weight: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 3
    },
    numericality: { onlyInteger: true },
  },
  age: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 3
    },
    numericality: { onlyInteger: true },
  },
  "blood_group": {
    presence: { allowEmpty: false, message: 'is required' }
  },
  "contact_number": {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: { onlyInteger: true, notValid: 'should contain digits only' },
    length: {
      is: 10,
      wrongLength: "needs to have %{count} digits"
    },
  },
  "home_town": {
    presence: { allowEmpty: false, message: 'is required' },
  },
  district: {
    presence: { allowEmpty: false, message: 'is required' },
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    // paddingBottom: 125,
    // flexBasis: 700,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
    // width: 1,
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  alert: {
    margin: theme.spacing(3, 0)
  },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(2),
    // minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  gridWidth: {
    maxWidth: 470,
    // marginRight: theme.spacing(2)
  },
  alert: {
    margin: theme.spacing(3, 0)
  },
}));

const DonorForm = props => {

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    navigate(-1)
  };

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    if (edit) {
      fetch(`${process.env.GATSBY_API_URL}/donar/lastdonation`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${getAccessToken()}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `donar_id=${props.donorId}&donation_date=${format(selectedDate, 'yyyy-mm-dd')}`
      })
        .then(response => response.json()) // parse JSON from request
        .then(resultData => {
          if (resultData["status_code"] === 200) {
            console.log(resultData)
            }
          else {
            // setFormState(formState => ({
            //   ...formState,
            //   success: 2,
            // }));
          }
        })
        return null
      }
    const donor = formState.values;
      console.log(donor)
      fetch(`${process.env.GATSBY_API_URL}/donar/create`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${getAccessToken()}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `name=${donor.name}&age=${donor.age}&blood_group=${donor["blood_group"]}&weight=${donor.weight}&contact_number=${donor["contact_number"]}&home_town=${donor["home_town"]}&district=${donor.district}`
      })
        .then(response => response.json()) // parse JSON from request
        .then(resultData => {
          console.log(resultData)
          if (resultData["status_code"] === 200) {
            setFormState(formState => ({
              isValid: false,
              values: {},
              touched: {},
              errors: {},
              success: 1,
            }));
          }
          else {
            setFormState(formState => ({
              ...formState,
              success: 2,
            }));
          }
          // setData(resultData.stargazers_count)
        })
      return null
      // handleLogin({ email: email, password: password })
      //   .then((authenticated) => {
      //     if (authenticated) {
      //       navigate('dashboard');
      //       return null;
      //     }

      //     setFormState(formState => ({
      //       ...formState,
      //       errors: { login: true },
      //     }));
      //   })
      //   .catch(console.error)
    };

    const hasError = field =>
      formState.touched[field] && formState.errors[field] ? true : false;


    const [selectedDate, setSelectedDate] = useState(new Date('2020-08-18T21:11:54'));
    const handleDateChange = date => {
      
console.log(format(date, 'yyyy-mm-dd'))
      setSelectedDate(date);
    };

    const { edit, donorId } = props;

    useEffect(() => {
      if (!edit) return
      fetch(`${process.env.GATSBY_API_URL}/donar/${donorId}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${getAccessToken()}`,
        },
      })
        .then(response => response.json()) // parse JSON from request
        .then(resultData => {
          console.log(resultData)
          if (resultData["status_code"] === 200) {
            const donor = resultData.donar;
            const values = {
              name: donor.name,
              age: donor.age,
              "blood_group": donor["blood_group"],
              weight: donor.weight,
              "contact_number": donor["contact_number"],
              "home_town": donor["home_town"],
              district: donor.district,
            }
            // const lastDonate = donor["last_donatied_at"]
            setFormState(formState => ({
              ...formState,
              values: { ...values }
            }));
          }
          else {
            // setFormState(formState => ({
            //   ...formState,
            //   success: 2,
            // }));
          }
          // setData(resultData.stargazers_count)
        })
    }, [])

    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
          justify="center"
        >
          <div className={classes.content}>
            <Paper className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSubmit}
              >
                <Grid container className={classes.gridWidth} spacing={3}>
                  <Grid item>
                    <Typography
                      className={classes.title}
                      variant="h2"
                      gutterBottom
                    >
                      Enter details of donor
                </Typography>
                  </Grid>
                  <Grid item>
                    {formState.success === 2 && <Alert
                      className={classes.alert}
                      severity="error"
                    >
                      An error occurred. Please try again!
                </Alert>}
                    {formState.success === 1 && <Alert
                      className={classes.alert}
                      severity="success"
                    >
                      Successsfully added a new donor
                </Alert>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.textField}
                      error={hasError('name')}
                      fullWidth
                      helperText={
                        hasError('name') ? formState.errors.name[0] : null
                      }
                      label="Name"
                      name="name"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.name || ''}
                      variant="outlined"
                      disabled={edit ? true : false}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      className={classes.textField}
                      error={hasError('weight')}
                      helperText={
                        hasError('weight') ? formState.errors.weight[0] : null
                      }
                      label="Weight"
                      name="weight"
                      onChange={handleChange}
                      type="number"
                      value={formState.values.weight || ''}
                      variant="outlined"
                      fullWidth
                      disabled={edit ? true : false}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      className={classes.textField}
                      error={hasError('age')}
                      helperText={
                        hasError('age') ? formState.errors.age[0] : null
                      }
                      label="Age"
                      name="age"
                      onChange={handleChange}
                      type="number"
                      value={formState.values.age || ''}
                      variant="outlined"
                      fullWidth
                      disabled={edit ? true : false}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      variant="outlined"
                      error={hasError('blood_group')}
                      required
                      className={classes.formControl}
                      fullWidth
                      disabled={edit ? true : false}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">Blood Group</InputLabel>
                      <Select
                        native
                        value={formState.values["blood_group"] || ''}
                        onChange={handleChange}
                        label="Blood Group"
                        inputProps={{
                          name: 'blood_group',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={0}>A+</option>
                        <option value={1}>A-</option>
                        <option value={2}>B+</option>
                        <option value={3}>B-</option>
                        <option value={4}>O+</option>
                        <option value={5}>O-</option>
                        <option value={6}>AB+</option>
                        <option value={7}>AB-</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className={classes.textField}
                      error={hasError('home_town')}
                      fullWidth
                      helperText={
                        hasError('home_town') ? formState.errors["home_town"][0] : null
                      }
                      label="Home Town"
                      name="home_town"
                      onChange={handleChange}
                      type="text"
                      value={formState.values["home_town"] || ''}
                      variant="outlined"
                      disabled={edit ? true : false}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className={classes.textField}
                      error={hasError('district')}
                      fullWidth
                      helperText={
                        hasError('district') ? formState.errors.district[0] : null
                      }
                      label="District"
                      name="district"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.district || ''}
                      variant="outlined"
                      disabled={edit ? true : false}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className={classes.textField}
                      error={hasError('contact_number')}
                      helperText={
                        hasError('contact_number') ? formState.errors["contact_number"][0] : null
                      }
                      label="Contact Number"
                      name="contact_number"
                      onChange={handleChange}
                      type="tel"
                      value={formState.values["contact_number"] || ''}
                      variant="outlined"
                      fullWidth
                      disabled={edit ? true : false}
                    />
                  </Grid>
                  {props.edit && <Grid item xs={12} sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="yyyy/mm/dd"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>}
                </Grid>
                <Grid container className={classes.gridWidth} spacing={3}>
                  <Grid item xs={6} sm={6}>
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={edit ? false : !formState.isValid}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Save
                </Button>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Button
                      className={classes.signInButton}
                      color="secondary"
                      // disabled={!formState.isValid}
                      component={RouterLink}
                      fullWidth
                      size="large"
                      variant="contained"
                      to={`/app/donors`}
                    >
                      Cancel
                </Button>
                  </Grid>

                </Grid>
              </form>
            </Paper>
          </div>
        </Grid>
      </div>
    );
  };

  export default DonorForm
