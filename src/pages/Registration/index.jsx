import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
	const dispatch = useDispatch();
	// const navigate = useNavigate();

	const isAuth = useSelector(selectIsAuth);
	console.log(isAuth);
	const {
		register,
		handleSubmit,
		// setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: { fullName: '', email: '', password: '' },
		mode: 'onChange',
	});

	const onSubmit = async (values) => {
		const data = await dispatch(fetchRegister(values));

		if (!data.payload) {
			return alert('Registration failed');
		}

		if ('token' in data.payload) {
			localStorage.setItem('token', data.payload.token);
		}
	};

	if (isAuth) {
		return <Navigate to={'/'} />;
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Create account
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="Fullname"
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					type="fullname"
					{...register('fullName', { required: 'Specify your fullname' })}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					type="email"
					{...register('email', { required: 'Specify your email' })}
					fullWidth
				/>
				<TextField
					className={styles.field}
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					type="password"
					{...register('password', { required: 'Specify your password' })}
					label="Password"
					fullWidth
				/>
				<Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
					Register
				</Button>
			</form>
		</Paper>
	);
};
