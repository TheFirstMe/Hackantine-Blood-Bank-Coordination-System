import React, { useState, useEffect } from 'react';
import { Link as RouterLink, navigate } from '@reach/router';
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

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  permissionID: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  mobileNumber: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: { onlyInteger: true, notValid: 'should contain digits only' },
    length: {
      is: 10,
      wrongLength: "needs to have %{count} digits"
    },
  },
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

const CreateUser = props => {

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
    const user = formState.values;
    console.log(user)
    fetch(`${process.env.GATSBY_API_URL}/user/create`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${getAccessToken()}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `name=${user.name}&email=${user.email}&mobile_number=91${user.mobileNumber}&password=${user.password}&permission_id=${user.permissionID}`
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
                    Enter user details
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
                    Successsfully added a new user
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    error={hasError('email')}
                    fullWidth
                    helperText={
                      hasError('email') ? formState.errors.email[0] : null
                    }
                    label="Email address"
                    name="email"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.email || ''}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    error={hasError('password')}
                    fullWidth
                    helperText={
                      hasError('password') ? formState.errors.password[0] : null
                    }
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={formState.values.password || ''}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    error={hasError('permissionID')}
                    required
                    className={classes.formControl}
                    fullWidth
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">Permission</InputLabel>
                    <Select
                      native
                      value={formState.values.permissionID || ''}
                      onChange={handleChange}
                      label="Permission"
                      inputProps={{
                        name: 'permissionID',
                        id: 'outlined-age-native-simple',
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={1}>All</option>
                      <option value={2}>View</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.textField}
                    error={hasError('mobileNumber')}
                    helperText={
                      hasError('mobileNumber') ? formState.errors.mobileNumber[0] : null
                    }
                    label="Mobile Number"
                    name="mobileNumber"
                    onChange={handleChange}
                    type="tel"
                    value={formState.values.mobileNumber || ''}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container className={classes.gridWidth} spacing={3}>
                <Grid item xs={6} sm={6}>
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={!formState.isValid}
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
                    to={`../`}
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

export default CreateUser
