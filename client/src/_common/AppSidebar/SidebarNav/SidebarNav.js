import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

import IconProfile from '@material-ui/icons/AccountBox'
import IconAccount from '@material-ui/icons/AccountBalance' //
import IconAdmin from '@material-ui/icons/VpnKey'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconSearch from '@material-ui/icons/Search'
import IconError from '@material-ui/icons/Error'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import IconQuestionAnswer from '@material-ui/icons/QuestionAnswer'
import IconStars from '@material-ui/icons/Stars'
import IconGlobe from '@material-ui/icons/Language'
import IconSettings from '@material-ui/icons/Business'
import IconGroup from '@material-ui/icons/Group'
import IconPreson from '@material-ui/icons/Person' //

import NavList from './NavList'

const SidebarNav = props => {
  const { isCollapsed } = props
  const classes = useStyles()

  const itemsCore = [
    {
      name: 'Dashboard',
      link: '/',
      Icon: IconDashboard,
    },
    {
      name: 'Auth',
      Icon: IconPreson,
      items: [
        {
          name: 'Login',
          link: '/auth/login',
        },
        {
          name: 'Signup',
          link: '/auth/signup',
        },
        {
          name: 'Recover',
          link: '/auth/recover',
        },
        {
          name: 'Reset',
          link: '/auth/reset',
        },
      ],
    },
    {
      name: 'Account',
      Icon: IconProfile,
      items: [
        {
          name: 'Profile',
          link: '/profile/me',
        },
        {
          name: 'Organization',
          link: '/organization',
        },
      ],
    },
    {
      name: 'Configuration',
      Icon: IconAdmin,
      items: [
        {
          name: 'All Organizations',
          link: '/administration/accounts',
          Icon: IconAccount,
        },
        {
          name: 'All Users',
          link: '/administration/users',
          Icon: IconGroup,
        },
      ],
    },    
    {
      name: 'Learn More - Modernize Your Business',
      link: '/modernize',
      Icon: IconSettings,
    }
    
  ]

  const itemsTheme = [
    {
      name: 'Why MSS?',
      link: '/about',
      Icon: IconGlobe,
      IconClassName: classes.iconFeatures,
    },
    {
      name: 'Docs',
      link: '/docs',
      Icon: IconLibraryBooks,
      IconClassName: classes.iconDocs,
    },    
    {
      name: 'Blog',
      link: '/blog',
      Icon: IconQuestionAnswer,
      IconClassName: classes.iconDiscuss,
    },
  ]

  return (
    <div>
      <List className={classes.navList} disablePadding>
        <ListSubheader disableSticky={true} className={classes.navListHeader}>
          Core Modules
        </ListSubheader>
        <NavList isCollapsed={isCollapsed} items={itemsCore} />
      </List>

      <List className={classes.navList} disablePadding>
        <ListSubheader disableSticky={true} className={classes.navListHeader}>
          References
        </ListSubheader>
        <NavList isCollapsed={isCollapsed} items={itemsTheme} />
      </List>
    </div>
  )
}

const useStyles = makeStyles(theme =>
  createStyles({
    navList: {
      width: theme.sidebar.width,
      fontSize: '1.1em',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    navListHeader: {
      textAlign: 'center',
      color: 'rgba(255,255,255,0.5)',
    },
    iconFeatures: {
      color: '#95de3c',
    },
    iconDocs: {
      color: '#f8cda9',
    },
    iconSupporters: {
      color: '#e3b546',
    },
    iconDiscuss: {
      color: '#ccc',
    },
  }),
)

export default SidebarNav
