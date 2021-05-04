import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Collapse, Typography } from '@material-ui/core';
import analyzeimage from '../static/analyze.gif';
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 645,
		minWidth: 645,
		background: 'rgb(0,0,0,0.5)',
		margin: '20px',
		[theme.breakpoints.down("md")]: {
			minWidth: 350,
		}
	},
	media: {
		height: 400,
	},
	title: {
		fontFamily: 'Nunito',
		fontWeight: 'bold',
		fontSize: '2rem',
		color: '#FFF',
	},
	desc: {
		fontFamily: 'Nunito',
		fontSize: '1.1rem',
		color: '#DDD',
	}
}));

export default function ImageCard({ place, checked }) {
	const classes = useStyles();	

	return (
		<Collapse
 			in={checked}
 			{...(checked ? { timeout: 1500 } : {})}
		>
		
			<Card className={classes.root}>
				<CardMedia
					component="img"
					className={classes.media}
					image={analyzeimage}
					title={place.title}					
				/>
				<CardContent>
					<Typography
						gutterBottom
						variant="h5"
						component="h1"
						className={classes.title}
					>
						{place.title}
					</Typography>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
						className={classes.desc}
					>
						{place.description}
					</Typography>
				</CardContent>
			</Card>
		</Collapse>
		
	);
}