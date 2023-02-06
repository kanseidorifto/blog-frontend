import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export const Index = ({ user, onSend }) => {
	const [text, setText] = React.useState('');

	const onClickSend = () => {
		onSend(text);
		setText('');
	};
	return (
		<>
			<div className={styles.root}>
				<Avatar
					classes={{ root: styles.avatar }}
					src={`${process.env.REACT_APP_API_URL}${user.avatarUrl}`}
				/>
				<div className={styles.form}>
					<TextField
						label="Type what you think..."
						variant="outlined"
						maxRows={10}
						multiline
						value={text}
						onChange={(event) => setText(event.target.value)}
						fullWidth
					/>
					<Button onClick={onClickSend} variant="contained">
						Send
					</Button>
				</div>
			</div>
		</>
	);
};
