import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Notifications, Password } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4)
  },
  container: {
    justifyContent: `center`,
  }
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
        className={classes.container}
      >
        {/* <Grid
          item
          md={7}
          xs={12}
        >
          <Notifications />
        </Grid> */}
        <Grid
          item
          md={7}
          xs={12}
        >
          <Password />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
