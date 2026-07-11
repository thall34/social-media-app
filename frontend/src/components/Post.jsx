import { Link } from 'react-router';
import deletePost from '../api/deletePost';

function Post({ userId, post, setPosts, setError }) {

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
            {post.text} {createdDate.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
            <Link to={`/user/post/update/${post.id}`}>
                <button>Edit Post</button>
            </Link>
            <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
        </div>
    )
};

export default Post;