import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import IconCode from '@material-ui/icons/Code'
import Build from '@material-ui/icons/Build'
import BugReport from '@material-ui/icons/BugReport'

const AppHeaderDemoButtons = props => {
  const classes = useStyles(props)

  return (
    <div className={classes.demo}>
      <Tooltip title="View code on the GitHub">
        <Button
          size="small"
          variant="outlined"
          color="primary"
          className={classes.button}
          href="https://github.com/pdhoward/mssdashboard"
        >
          <IconCode className={classes.demoIcon} />
          <span className={classes.demoName}>View on GitHub</span>
        </Button>
      </Tooltip>
      <Tooltip title="Let us know if you see an issue">
        <Button
          size="small"
          variant="outlined"
          color="primary"
          className={classes.button}
          href="https://github.com/pdhoward/mssdashboard/issues"
        >
          <BugReport className={classes.demoIcon} />
          <span className={classes.demoName}>Open an Issue</span>
        </Button>
      </Tooltip>
      <Tooltip title="Contribute! Let us know what you'd like to see">
        <Button
          size="small"
          variant="outlined"
          color="primary"
          className={classes.button}
          href="https://github.com/pdhoward/mssdashboard/pulls"
        >
          <Build className={classes.demoIcon} />
          <span className={classes.demoName}>Submit Design Ideas</span>
        </Button>
      </Tooltip>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  demo: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoIcon: {},
  demoName: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  button: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      margin: 3,
    },
  },
}))

export default AppHeaderDemoButtons
