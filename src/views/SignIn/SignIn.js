import React, { useState, useEffect } from 'react';
import { Link as RouterLink, navigate } from '@reach/router';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'
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
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    paddingTop: theme.spacing(6),
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
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    paddingTop: theme.spacing(6),
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
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
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  alert: {
    margin: theme.spacing(3, 0)
  },
}));

const SignIn = props => {
  if (isLoggedIn()) {
    navigate(`dashboard`)
  }

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
    const { email, password } = formState.values;
    handleLogin({ email: email, password: password })
      .then((authenticated) => {
        if (authenticated) {
          navigate('dashboard');
          return null;
        }

        setFormState(formState => ({
          ...formState,
          errors: { login: true },
        }));
      })
      .catch(console.error)
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
          <div className={classes.contentBody}>
            <form
              className={classes.form}
              onSubmit={handleSubmit}
            >
              <Typography
                className={classes.title}
                variant="h2"
                gutterBottom
              >
                Sign in
                </Typography>
              {/* <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  or login with email address
                </Typography> */}
              {formState.errors.login && <Alert
                className={classes.alert}
                severity="error"
              >
                Email address or password is incorrect!
                </Alert>}
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
              <Button
                className={classes.signInButton}
                color="primary"
                disabled={!formState.isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign in now
                </Button>
              {/* <Typography
                color="textSecondary"
                variant="body1"
              >
                Forgot password?{' '}
                <Link
                  component={RouterLink}
                  to="/sign-up"
                  variant="h6"
                >
                  Reset
                  </Link>
              </Typography> */}
            </form>
          </div>
        </div>
      </Grid>
    </div>
  );
};


export default SignIn;
