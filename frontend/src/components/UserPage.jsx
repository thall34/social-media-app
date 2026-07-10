import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router';
import NewPost from './NewPost';
import getCurrentUser from '../api/getCurrentUser';
import logOutUser from '../api/logOutUser';
import deletePost from '../api/deletePost';

function UserPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function handleLogout() {
    try {
        await logOutUser();
        navigate('/');
    } catch(err) {
        setError(err);
    };
  };

  async function handleDeletePost(id) {
    try {
      await deletePost(id, user.id);
      setPosts((prevPosts) => {
          return prevPosts.filter((post) => post.id !== id);
      });
    } catch(err) {
      setError(err);
    };
  };

  useEffect(() => {
    async function initializePage() {
      try {
        const currentUser = await getCurrentUser();
        const currentPosts = currentUser.posts;
        setUser(currentUser);
        setPosts(currentPosts);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      };
    };

    initializePage();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  };

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
        <Link to='/'>
          <button onClick={() => setError(null)}>Back to Homepage</button>
        </Link>
      </div>
    )
  };

  if (user) {
    const activeDate = new Date(user.createdAt);
    const birthDate = new Date(user.birthDate);

    return (
      <div>
        <div>
            <h1>{user.firstName} {user.lastName}</h1>
            <p>Active since {activeDate.toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
            <p>{user.city}</p>
            <p>{birthDate.toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
        </div>
        {posts.length > 0 ? (
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                      {post.text}
                      <Link to={`/user/post/update/${post.id}`}>
                        <button>Edit Post</button>
                      </Link>
                      <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                    </li>
                ))}
            </ul>
        ) : (
            <>
                <h3>No posts yet</h3>
            </>
        )}
        <Link to='/user/post/new'>
          <button>Create New Post</button>
        </Link>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    )
  };

  return (
    <div>
      <h1>Not Authenticated</h1>
      <Link to='/'>
        <button>Go to Homepage</button>
      </Link>
    </div>
  )
};

export default UserPage;