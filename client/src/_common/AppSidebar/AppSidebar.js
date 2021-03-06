import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

import AppSidebarBg from './AppSidebarBg.jpg'
import Logo from '../BaseLogo'
import SidebarNav from './SidebarNav'

const Sidebar = props => {
  const { isCollapsed } = props

  const classes = useStyles(props)

  return (
    <aside className={classes.sidebar}>
      <div className={classes.sidebarBackground} />
      <div className={classes.sidebarBody}>
        <div className={classes.sidebarHeader}>
          <Link to="/" className={classes.sidebarTitleLink}>
            <Logo size={30} isInversed={true} className={classes.logo} />
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              noWrap
              className={classes.title}
            >
              <span className={classes.name}>MSS International Lab</span>
              <span className={classes.tagline}>Real Time Enterprise</span>
            </Typography>
          </Link>
        </div>
        <SidebarNav isCollapsed={isCollapsed} />
      </div>
    </aside>
  )
}

Sidebar.defaultProps = {
  isCollapsed: false,
}

Sidebar.propTypes = {
  isCollapsed: PropTypes.bool,
}

const useStyles = makeStyles(theme => ({
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    color: theme.sidebar.color,
    background: theme.sidebar.background,
  },
  sidebarBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 0,
    backgroundImage: `url(${AppSidebarBg})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',
  },
  sidebarBody: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  sidebarTitleLink: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
  },
  logo: {
    color: theme.palette.secondary.main,
    zIndex: 10,
  },
  title: props => ({
    position: 'relative',
    overflow: 'visible',
    marginTop: '10px',
    marginLeft: '2px',
    display: props.isCollapsed ? 'none' : 'block',
    fontSize: '0.7rem',
    letterSpacing: '.015em',
    // fontWeight: 'bold',
  }),
  name: {},
  tagline: {
    fontSize: 8,
    fontWeight: 'bold',
    position: 'absolute',
    top: '100%',
    marginTop: -12,
    background: theme.palette.primary.main,
    color: '#fff',
    borderRadius: 2,
    padding: '1px 3px',
    right: 0,
  },
}))

export default Sidebar
