import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery, Container, Typography, CssBaseline } from '@material-ui/core';

import { Sidebar, Topbar, Footer } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    // height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    },
    // minHeight: `100vh`
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    minHeight: '100vh',
    display: `flex`,
    flexDirection: `column`,
    // marginTop: theme.spacing(3)
  },
  footer: {
    // padding: theme.spacing(3, 2),
    marginTop: 'auto',
  }
}));


const Main = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        {children}
        <Footer className={classes.footer} />
      </main>
    </div>
  );

  // return (
  //   <div
  //     className={clsx({
  //       [classes.root]: true,
  //       [classes.shiftContent]: isDesktop
  //     })}
  //   >
  //     <CssBaseline />
  //     <Topbar onSidebarOpen={handleSidebarOpen} />
  //     <Sidebar
  //       onClose={handleSidebarClose}
  //       open={shouldOpenSidebar}
  //       variant={isDesktop ? 'persistent' : 'temporary'}
  //     />
  //     <main className={classes.main}>
  //       <Typography variant="h2" component="h1" gutterBottom>
  //         Sticky footer
  //       </Typography>
  //       <Typography variant="h5" component="h2" gutterBottom>
  //         {'Pin a footer to the bottom of the viewport.'}
  //         {'The footer will move as the main element of the page grows.'}
  //       </Typography>
  //       <Typography variant="body1">Sticky footer placeholder.</Typography>
  //       {children}
  //     </main>
  //     <footer className={classes.footer}>
  //       <Container maxWidth="sm">
  //         <Typography variant="body1">My sticky footer can be found here.</Typography>
  //         <Copyright />
  //       </Container>
  //     </footer>
  //   </div>
  // );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
