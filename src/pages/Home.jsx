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

const tabs = [
	{ name: 'Latest', sortType: 'latests' },
	{ name: 'Popular', sortType: 'views' },
];

export const Home = () => {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.data);
	const { posts, tags } = useSelector((state) => state.posts);

	const [lastComments, setLastComments] = React.useState([]);
	const [isCommentsLoading, setCommentsLoading] = React.useState(true);
	const [activeTab, setActiveTab] = React.useState(0);

	const isPostLoading = posts.status === 'loading';
	const isTagsLoading = tags.status === 'loading';

	const onClickTab = (index) => {
		setActiveTab(index);
	};

	React.useEffect(() => {
		dispatch(fetchPosts({ sortBy: tabs[activeTab].sortType }));
	}, [activeTab]);

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
			<Tabs style={{ marginBottom: 15 }} value={activeTab} aria-label="basic tabs example">
				{tabs.map((tab, index) => (
					<Tab key={index} label={tab.name} onClick={() => onClickTab(index)} />
				))}
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
									commentsCount={obj.commentsCount}
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
