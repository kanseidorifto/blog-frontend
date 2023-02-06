import { Avatar } from '@mui/material';
import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
	return (
		<div className={styles.root}>
			<Avatar
				className={styles.avatar}
				src={`${process.env.REACT_APP_API_URL}${avatarUrl}` || '/noavatar.png'}
				alt={fullName}
			/>
			<div className={styles.userDetails}>
				<span className={styles.userName}>{fullName}</span>
				<span className={styles.additional}>{additionalText}</span>
			</div>
		</div>
	);
};
