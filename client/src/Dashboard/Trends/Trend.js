import React from 'react'
import PropTypes from 'prop-types'
import {
  makeStyles,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  LinearProgress,
} from '@material-ui/core'
import { Timeline as IconTimeline, MoreVert as IconMoreVert } from '@material-ui/icons'
import { Bar } from 'react-chartjs-2'

import { subscriptionsItems, subscriptionsHistoryChart } from './data'

const Trend = props => {

  let {data, options, trends} = props
  console.log(trends)
  const classes = useStyles()

  return (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={<IconTimeline className={classes.headerIcon} />}
        action={
          <IconButton aria-label="settings" size="small">
            <IconMoreVert />
          </IconButton>
        }
        title="Real-time Aggregate Sales - by Brand and State"
      />
      <CardContent className={classes.cardContent}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8} md={9} className={classes.chartBox}>
            <div className={classes.chartContainer}>
              <div className={classes.chart}>
                <Bar data={data} options={options} />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={3} className={classes.ratingBox}>
            {trends.map(({ state, ratio, value }, i) => (
              <div key={i}>
                <Grid container>
                  <Grid item xs>
                    <Typography variant="body1">{state}</Typography>
                  </Grid>
                  <Grid item xs className={classes.ratingItemValueBox}>
                    <Typography
                      align="right"
                      variant="body2"
                      display="inline"
                      className={classes.ratingItemValue}
                    >
                      {value}
                    </Typography>
                    <Typography
                      align="left"
                      variant="body2"
                      color="textSecondary"
                      className={classes.ratingItemRatio}
                    >
                      {ratio}%
                    </Typography>
                  </Grid>
                </Grid>
                <LinearProgress variant="determinate" value={ratio} color="primary" />
              </div>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

Trend.propTypes = {}

const useStyles = makeStyles(theme => ({
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
  chartBox: {
    borderRight: '1px solid',
    borderRightColor: theme.palette.divider,
  },
  chartContainer: {
    width: '100%',
    position: 'relative',
    paddingBottom: '25%',
    [theme.breakpoints.down("xs")]: {
      minHeight: 200      
    },
    [theme.breakpoints.between("sm", "md")]: {
      minHeight: 300      
    },
    "@media (min-width: 1280px)": {
      minHeight: 440      
    }
  },
  chart: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: 'default',
    },
  },
  ratingBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  ratingItemValueBox: {
    textAlign: 'right',
    fontSize: '0.7em',
  },
  ratingItemValue: {
    display: 'inline-block',
  },
  ratingItemRatio: {
    marginLeft: 4,
    display: 'inline-block',
    width: '3em',
    // fontSize: '1em',
  },
}))

export default Trend
