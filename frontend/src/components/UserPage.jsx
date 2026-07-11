import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router';
import NewPost from './NewPost';
import Post from './Post';
import getCurrentUser from '../api/getCurrentUser';
import logOutUser from '../api/logOutUser';
import deleteUser from '../api/deleteUser';
import formatBirthday from '../utils/formatBirthday';

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

  async function handleDeleteUser() {
    try {
      const success = await deleteUser(user.id);

      if (!success) {
        const error = new Error('Error Deleting User');
        error.status = 400;
        setError(error);
        return;
      };

      await logOutUser();
      navigate('/');
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

    return (
      <div>
        <div>
            <h1>{user.firstName} {user.lastName}</h1>
            <p>Active since {activeDate.toLocaleDateString('en-CA', { dateStyle: 'medium' })}</p>
            <p>{user.city}</p>
            <p>{formatBirthday(user.birthDate)}</p>
        </div>
        {posts.length > 0 ? (
            <div>
                {posts.map((post) => (
                    <Post key={post.id} userId={user.id} post={post} setPosts={setPosts} setError={setError} />
                ))}
            </div>
        ) : (
            <>
                <h3>No posts yet</h3>
            </>
        )}
        <Link to='/user/post/new'>
          <button>Create New Post</button>
        </Link>
        <Link to='/user/update'>
          <button>Edit User Profile</button>
        </Link>
        <button onClick={handleDeleteUser}>Delete User</button>
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