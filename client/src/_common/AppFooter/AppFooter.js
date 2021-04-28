import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import pkg from '../../../package.json'

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="left">
        {`MSS International`}{' '}
        <Link
          color="primary"
          href="https://www.mssint.com/"
        >
          v{pkg.version}
        </Link>
        {' | '}
        <Link
          color="primary"
          href="https://github.com/pdhoward/mssdashboard/blob/main/LICENSE"
        >
          MIT License
        </Link>
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="primary" href="https://github.com/pdhoward">
          GitHub
        </Link>
        {' | '}
        <Link color="primary" href="https://www.linkedin.com/company/mss-international-gmbh/about/">
          LinkedIn
        </Link>
      </Typography>
      <Typography variant="body2" color="textSecondary" align="right">
        {'Built with '}
        <Link color="primary" href="https://www.redhat.com/en/blog/introducing-red-hat-openshift-streams-apache-kafka">
          KAFKA
        </Link>
        {' by '}
        <Link color="primary" href="https://www.mssint.com/">
          MSS International
        </Link>
      </Typography>
    </footer>
  )
}

const useStyles = makeStyles(theme => ({
  footer: {
    display: 'flex',
    background: '#fff',
    padding: '0.5rem 1rem',
    justifyContent: 'space-between',
  },
}))

export default Footer
