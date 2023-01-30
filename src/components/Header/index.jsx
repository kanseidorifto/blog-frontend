import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);

	const onClickLogout = () => {
		if (window.confirm('Are you sure you want to log out?')) {
			dispatch(logout());
			localStorage.removeItem('token');
		}
	};

	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link className={styles.logo} to="/">
						<div>1337 BLOG</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Link to="/add-post">
									<Button variant="contained">WRITE ARTICLE</Button>
								</Link>
								<Button onClick={onClickLogout} variant="contained" color="error">
									LOGOUT
								</Button>
							</>
						) : (
							<>
								<Link to="/login">
									<Button variant="outlined">SIGN IN</Button>
								</Link>
								<Link to="/register">
									<Button variant="contained">CREATE ACCOUNT</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
