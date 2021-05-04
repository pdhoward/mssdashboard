import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';


const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		fontFamily: 'Nunito',
	},
	appbar: {
		background: 'none',
		fontFamily: "Nunito",		
	},
	appbarWrapper: {
		width: '80%',
		margin: '0 auto'
	
	},
	appbarTitle: {
		flexGrow: '1'
	},
	icon: {
		color: '#fff',
		fontSize: '2rem',
	},
	colorText: {
		color: '#215BFF',
	},
	container: {
		textAlign: 'center',		
		marginLeft: '200px'
	},
	title: {
		color: '#FFF',
		fontSize: '3.5rem',
	},
	goDown: {
		color: '#215BFF',
		fontSize: '4em'
		
	}
}));

export default function Header() {
	const classes = useStyles();
	const [checked, setChecked] = useState(false);
	useEffect(() => {
		setChecked(true);
	}, [])

	return (
		<div className={classes.root} id="header">
			<AppBar className={classes.appbar} elevation={0}>
				<Toolbar className={classes.appbarWrapper}>					
					<IconButton>
						<SortIcon className={classes.icon} />
					</IconButton>
				</Toolbar>
			</AppBar>			
			<div className={classes.container}>
				<h2 className={classes.title}>
					<br/>					
				<span className={classes.colorText}>Under Construction</span>
				</h2>
				<Scroll to="place-to-view" smooth={true}>
					<IconButton>
						<ExpandMoreIcon className={classes.goDown} />
					</IconButton>
				</Scroll>
			</div>	
		</div>
	);
}