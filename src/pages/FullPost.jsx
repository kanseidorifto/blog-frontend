import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import axios from '../axios';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
export const FullPost = () => {
	const auth = useSelector((state) => state.auth);
	const isLogged = localStorage.getItem('token') && Boolean(auth.data);

	const [post, setPost] = React.useState();
	const [isLoading, setLoading] = React.useState(true);
	const [comments, setComments] = React.useState();
	const [isCommentsLoading, setCommentsLoading] = React.useState(true);
	const { id } = useParams();

	React.useEffect(() => {
		axios
			.get(`/posts/${id}`)
			.then((res) => {
				setPost(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				alert('Error retrieving post');
			});
	}, [id]);

	const fetchComments = () => {
		axios
			.get(`/comments/${id}`)
			.then((res) => {
				setComments(res.data);
				setCommentsLoading(false);
			})
			.catch((err) => {
				console.warn('Error fetching comments');
				alert('Error retrieving comments');
			});
	};
	React.useEffect(() => {
		fetchComments();
	}, []);

	const onSendComment = async (text) => {
		try {
			const fields = {
				text,
			};

			await axios.post(`/comments/${id}`, fields);

			fetchComments();
		} catch (err) {
			console.warn(err);
			alert('Failed creating comment');
		}
	};

	if (isLoading) {
		return <Post isLoading={true} isFullPost />;
	}

	return (
		<>
			<Post id={post._id} {...post} isFullPost>
				<ReactMarkdown children={post.text} />
			</Post>
			{isCommentsLoading ? (
				<CommentsBlock isLoading={true} />
			) : (
				<CommentsBlock items={comments} isLoading={false}>
					{isLogged && <Index user={auth.data} onSend={onSendComment} />}
				</CommentsBlock>
			)}
		</>
	);
};
