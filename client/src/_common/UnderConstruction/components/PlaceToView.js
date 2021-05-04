import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import places from '../static/place';
import useWindowPosition from '../hook/useWindowPosition';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		[theme.breakpoints.down("md")]: {
			flexDirection: 'column',
		},
		marginTop: '200px',
		marginLeft: '200px'
	},
}));

export default function PlaceToView() {
	const classes = useStyles();
	const checked = useWindowPosition('header');
	return (
		<div className={classes.root} id="place-to-view">
			<ImageCard place={places[0]} checked={checked} />		
		</div>
	);
}