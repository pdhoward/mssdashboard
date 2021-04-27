import React from 'react'
import dayjs from 'dayjs'

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

const Products = props => {
  const classes = useStyles()
  let messages = props.messages

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
          title="New Subscribers"
        />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Subscriber</TableCell>                
                <TableCell align="right">Plan</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map(m => (
                <TableRow key={m.seq}>
                  <TableCell component="th" scope="row">
                    {m.name}
                  </TableCell>
                  <TableCell align="right">{m.plan}</TableCell>
                  <TableCell align="right">{m.location}</TableCell>                  
                  <TableCell align="right">
                    <p>{dayjs(m.timestamp).format("h:mm:ss a")}</p>
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

Products.propTypes = {}

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

export default Products
