import React, {useState, useEffect} from 'react'
import moment from 'moment'

import {
  makeStyles,
  Box,
  Grid,
  Card,
  Button,
  CardHeader,
  CardActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import { Notes as IconNotes, MoreVert as IconMoreVert } from '@material-ui/icons'
import { recentSubscriptions } from './data'
import { w3cwebsocket as W3CWebSocket } from "websocket";
const socket = new W3CWebSocket('ws://127.0.0.1:5000');

const Subscriptions = props => {
  const classes = useStyles()

  const [userName, setUserName] = useState("MSS")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([{}])

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    socket.onmessage = (message) => { 
      let data = JSON.parse(message.data)
      console.log(messages)
      console.log(data)    
      setMessages([...messages, ...data])     
    };
  })

  return (
    <Grid item xs={12} sm={12} md={6}>
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          avatar={<IconNotes className={classes.headerIcon} />}
          action={
            <IconButton aria-label="settings" size="small">
              <IconMoreVert />
            </IconButton>
          }
          title="Recent Product Sales"
        />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Unit Sales</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map(m => (
                <TableRow key={m.seq}>
                  <TableCell component="th" scope="row">
                    {m.name}
                  </TableCell>
                  <TableCell align="right">{m.unitsales}</TableCell>
                  <TableCell align="right">{m.price}</TableCell>
                  <TableCell align="right">
                    <p>{moment(m.timestamp).format()}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CardActions>
          <Button size="small" color="primary">
            View All
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

Subscriptions.propTypes = {}

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
  },
  cardHeader: {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
  },
  cardBody: {
    overflow: 'hidden',
  },
  headerTitleBox: {},
  headerActionsBox: {
    textAlign: 'right',
  },
  headerIcon: {
    color: theme.palette.primary.main,
    verticalAlign: 'sub',
    marginRight: '.3em',
  },
}))

export default Subscriptions
