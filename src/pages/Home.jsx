import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import axios from '../axios';

export const Home = () => {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.data);
	const { posts, tags } = useSelector((state) => state.posts);

	const [lastComments, setLastComments] = React.useState([]);
	const [isCommentsLoading, setCommentsLoading] = React.useState(true);

	const isPostLoading = posts.status === 'loading';
	const isTagsLoading = tags.status === 'loading';

	React.useEffect(() => {
		dispatch(fetchPosts());
	}, []);

	React.useEffect(() => {
		dispatch(fetchTags());
	}, []);

	React.useEffect(() => {
		axios
			.get('/comments')
			.then((res) => {
				setLastComments(res.data);
				setCommentsLoading(false);
			})
			.catch((err) => {
				console.warn('Error fetching last comments');
				alert('Error retrieving comments');
			});
	}, []);

	return (
		<>
			<Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
				<Tab label="Новые" />
				<Tab label="Популярные" />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{isPostLoading
						? [...Array(5)].map((_, index) => <Post key={index} isLoading={true} />)
						: posts.items.map((obj, index) => (
								<Post
									key={obj._id}
									id={obj._id}
									title={obj.title}
									imageUrl={obj.imageUrl}
									user={obj.user}
									createdAt={obj.createdAt}
									viewsCount={obj.viewsCount}
									commentsCount={3}
									tags={obj.tags}
									isEditable={userData?._id === obj.user._id}
								/>
						  ))}
				</Grid>
				<Grid xs={4} item>
					{isTagsLoading ? (
						<TagsBlock isLoading={true} />
					) : (
						<TagsBlock items={tags.items} isLoading={false} />
					)}
					{isCommentsLoading ? (
						<CommentsBlock isLoading={true} />
					) : (
						<CommentsBlock items={lastComments} isLoading={false} />
					)}
				</Grid>
			</Grid>
		</>
	);
};
