import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

export const Login = () => {
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
		defaultValues: { email: '', password: '' },
		mode: 'onChange',
	});

	const onSubmit = async (values) => {
		const data = await dispatch(fetchAuth(values));

		if (!data.payload) {
			return alert('Login failed');
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
				Login to your account
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					type="email"
					{...register('email', { required: 'Specify email' })}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label="Password"
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					type="password"
					{...register('password', { required: 'Specify password' })}
					fullWidth
				/>
				<Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
					Sign In
				</Button>
			</form>
		</Paper>
	);
};
