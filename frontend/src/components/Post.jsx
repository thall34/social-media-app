import { useState, useEffect } from 'react'
import { Link } from 'react-router';
import deletePost from '../api/deletePost';
import addLikeToPost from '../api/addLikeToPost';
import removeLikeFromPost from '../api/removeLikeFromPost';
import Comment from './Comment';

function Post({ userId, post, setPosts, setError }) {
    const [comments, setComments] = useState(post.comments);
    const [likes, setLikes] = useState(post.likes);

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
                    userId: like.data.userId,
                },
            ]);
        } catch (err) {
            setError(err);
        };
    };

    async function handleRemoveLike(id) {
        try {
            const removedLike = await removeLikeFromPost(id, userId);
            setLikes((prevLikes) => {
                return prevLikes.filter((like) => like.userId !== userId);
            });
        } catch (err) {
            setError(err);
        };
    };

    return (
        <div className='post-background'>
            <section className='post'>
                <section className='post-details'>
                    {post.authorId === userId ? (
                        <>
                            <Link to='/user/posts'>
                                <span>
                                    <img src={post.author.profilePicFilePath} className='image user' />
                                    <p>{post.author.firstName} {post.author.lastName}</p>
                                </span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to={`/user/peer/${post.authorId}`}>
                                <span>
                                    <img src={post.author.profilePicFilePath} className='image user' />
                                    <p>{post.author.firstName} {post.author.lastName}</p>
                                </span>
                            </Link>
                        </>
                    )}
                    <p>{post.text}</p>
                    <p>{createdDate.toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </section>
                <section className='post-buttons'>
                    <button>Likes 👍: {likes.length}</button>
                    {likes.some(like => like.userId === userId) ? (
                        <button onClick={() => handleRemoveLike(post.id)}>Liked 👍</button>
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
                </section>
                <section className='comments'>
                    {comments.length > 0 ? (
                        <>
                            {comments.map((comment) => (
                                <Comment key={comment.id} userId={userId} postId={post.id} comment={comment} setComments={setComments} setError={setError} />
                            ))}
                        </>
                    ) : (
                        <h3>No Comments Yet</h3>
                    )}
                    <Link to={`/user/post/${post.id}/comment/new`}>
                        <button>Add Comment</button>
                    </Link>
                </section>
            </section>
        </div>
    )
};

export default Post;