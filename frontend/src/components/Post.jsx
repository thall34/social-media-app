import { useState, useEffect } from 'react'
import { Link } from 'react-router';
import deletePost from '../api/deletePost';
import getLikesForPost from '../api/getLikesForPost';
import addLikeToPost from '../api/addLikeToPost';
import removeLikeFromPost from '../api/removeLikeFromPost';
import Comment from './Comment';

function Post({ userId, post, setPosts, setError }) {
    const [comments, setComments] = useState(post.comments);
    const [likes, setLikes] = useState([]);

    const createdDate = new Date(post.createdAt);

    async function handleDeletePost(id) {
        try {
            await deletePost(id, userId);
            setPosts((prevPosts) => {
                return prevPosts.filter((post) => post.id !== id);
            });
        } catch (err) {
            setError(err);
        };
    };

    async function handleLikePost(id) {
        try {
            const like = await addLikeToPost(id, userId);
            setLikes((prevLikes) => [
                ...prevLikes, {
                    userId: like.newLike.userId,
                },
            ]);
        } catch(err) {
            setError(err);
        };
    };

    async function handleRemoveLike(id) {
        try {
            const removedLike = await removeLikeFromPost(id, userId);
            setLikes((prevLikes) => {
                return prevLikes.filter((like) => like.userId !== userId);
            });
        } catch(err) {
            setError(err);
        };
    };

    useEffect(() => {
        async function initializePost() {
            try {
                const postLikes = await getLikesForPost(post.id);
                setLikes(postLikes.likes);
            } catch(err) {
                setError(err);
            };
        };

        initializePost();
    }, []);

    return (
        <div>
            <span>{post.text} {createdDate.toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })} Likes: {likes.length}</span>
            {likes.some(like => like.userId === userId) ? (
                <button onClick={() => handleRemoveLike(post.id)}>Liked</button>
            ) : (
                <button onClick={() => handleLikePost(post.id)}>Like</button>    
            )}
            {post.authorId === userId ? (
            <>
                <Link to={`/user/post/${post.id}/update`}>
                    <button>Edit Post</button>
                </Link>
                <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
            </>
            ) : (
                <></>
            )}
            {comments.length > 0 ? (
                <div>
                    {comments.map((comment) => (
                        <Comment key={comment.id} userId={userId} postId={post.id} comment={comment} setComments={setComments} setError={setError} />
                    ))}
                </div>
            ) : (
                <h3>No Comments Yet</h3>
            )}
            <Link to={`/user/post/${post.id}/comment/new`}>
                <button>Add Comment</button>
            </Link>
        </div>
    )
};

export default Post;