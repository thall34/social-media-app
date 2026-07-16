import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import Post from './Post';
import getCurrentUser from '../api/getCurrentUser';
import getAllPostsForUser from '../api/getAllPostsForUser';
import deleteUser from '../api/deleteUser';

function UserPosts() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
        const currentPosts = await getAllPostsForUser(currentUser.id);
        setUser(currentUser);
        setPosts(currentPosts.posts);
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
      <div className='page'>
        <h1>Loading...</h1>
      </div>
    )
  };

  if (error) {
    return (
      <div className='page'>
        <Header user={user} setError={setError} />
        <h1>{error.message}</h1>
        <Link to='/user/posts'>
          <button onClick={() => setError(null)}>Back to User Posts</button>
        </Link>
        <Footer />
      </div>
    )
  };

  if (user) {
    const activeDate = new Date(user.createdAt);

    return (
      <div className='page'>
        <Header user={user} setError={setError} />
        <main>
        <section className='user-details'>
            <h1>{user.firstName} {user.lastName}</h1>
              <Link to={user.profilePicFilePath}>
                <img src={user.profilePicFilePath} className='image profile'></img>
              </Link>
            <Link to='/user/profile/pic/update'>Update Profile Picture</Link>
            <p>Active since {activeDate.toLocaleDateString('en-CA', { dateStyle: 'medium' })}</p>
        </section>
        <h2>Posts</h2>
        <Link to='/user/post/new'>
          <button>Create New Post</button>
        </Link>
        <section className='user-posts'>
        {posts.length > 0 ? (
            <>
                {posts.map((post) => (
                    <Post key={post.id} userId={user.id} post={post} setPosts={setPosts} setError={setError} />
                ))}
            </>
        ) : (
            <>
                <h3>No posts yet</h3>
            </>
        )}
        </section>
        </main>
        <Footer />
      </div>
    )
  };

  return (
    <div className='page'>
      <Header user={user} setError={setError} />
      <h1>Not Authenticated</h1>
      <Link to='/'>
        <button>Go to Homepage</button>
      </Link>
    </div>
  )
};

export default UserPosts;