import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import IconNotifications from '@material-ui/icons/Notifications'
import Menu from '@material-ui/core/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const notifications = [
  {
    user: {
      name: 'Juan Carlos',
      image: 'https://material-ui.com/static/images/avatar/1.jpg',
    },
    title: 'Thank You',
    content: " — This commerce platform is plazing fast. Thank you MSS …",
  },
  {
    user: {
      name: 'Tobia Schneider',
      image: 'https://material-ui.com//static/images/avatar/2.jpg',
    },
    title: 'Migration',
    content: " — We are delighted with the Brand sales, and would like to board more products …",
  },
  {
    user: {
      name: 'Isla Smith',
      image: 'https://material-ui.com//static/images/avatar/3.jpg',
    },
    title: 'Conversion',
    content: '- Please contact me about the COBOL to Java test results ....',
  },
]

const AppHeaderNotifications = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <div className={classes.headerNotifications}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="Search"
        className={classes.button}
        aria-controls="HeaderNotifications"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge badgeContent={3} color="secondary" classes={{ badge: classes.badge }}>
          <IconNotifications />
        </Badge>
      </IconButton>
      <Menu
        id="HeaderNotifications"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{ paper: classes.notifications }}
      >
        <List className={classes.notifications}>
          {notifications.map((notification, index) => (
            <ListItem button alignItems="flex-start" key={index}>
              <ListItemAvatar>
                <Avatar alt={notification.user.name} src={notification.user.image} />
              </ListItemAvatar>
              <ListItemText
                primary={notification.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {notification.user.name}
                    </Typography>
                    {notification.content}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Menu>
    </div>
  )
}

// const HeaderNotificationsContent = () => {
//   const classes = useStyles()

//   return <List className={classes.notifications}></List>
// }

const useStyles = makeStyles(theme => ({
  headerNotifications: {
    marginRight: 23,
    // position: 'relative',
    // position: 'absolute'
  },
  notificationsContainer: {
    // position: 'relative',
  },
  button: {},
  badge: {
    color: '#fff',
  },
  notifications: {
    // width: 360,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}))

export default AppHeaderNotifications
