import React from 'react'
import { Route, Redirect } from 'react-router-dom' 
import { makeStyles } from '@material-ui/core/styles'

import { Grid, Typography, Link, Box, Hidden } from '@material-ui/core/'
import { Link as RouterLink } from 'react-router-dom'

import Accounts from '../_common/UnderConstruction'
import Users from '../_common/UnderConstruction'


function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" component={RouterLink} to="/">
        Go back to dashboard
      </Link>
    </Typography>
  )
}

export default function Configuration({ match }) {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={12} md={4} className={classes.formSection}>
        <Box p={2}>
          <Footer />
          <Redirect exact from={`${match.path}/`} to={`${match.path}/accounts`} />
          <Route path={`${match.path}/accounts`} component={Accounts} />
          <Route path={`${match.path}/users`} component={Users} />
                
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={8} className={classes.introSection}></Grid>
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '100vh',
  },
  formSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/background-auth.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))
