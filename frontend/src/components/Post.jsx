import { useState } from 'react'
import { Link } from 'react-router';
import deletePost from '../api/deletePost';
import Comment from './Comment';

function Post({ userId, post, setPosts, setError }) {
    const [comments, setComments] = useState(post.comments);

    async function handleDeletePost(id) {
    try {
      await deletePost(id, userId);
      setPosts((prevPosts) => {
          return prevPosts.filter((post) => post.id !== id);
      });
    } catch(err) {
      setError(err);
    };
  };

  const createdDate = new Date(post.createdAt);

    return (
        <div>
            <span>{post.text} {createdDate.toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })}</span>
            <Link to={`/user/post/${post.id}/update`}>
                <button>Edit Post</button>
            </Link>
            <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
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