import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router';
import NewPost from './NewPost';
import Post from './Post';
import Peer from './Peer';
import getCurrentUser from '../api/getCurrentUser';
import logOutUser from '../api/logOutUser';
import deleteUser from '../api/deleteUser';
import getPeerPool from '../api/getPeerPool';
import formatBirthday from '../utils/formatBirthday';

function UserPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [peerPool, setPeerPool] = useState([]);
  const [requestSentPool, setRequestSentPool] = useState([]);
  const [requestReceivedPool, setRequestReceivedPool] = useState([]);
  const [followedPool, setFollowedPool] = useState([]);
  const [followerPool, setFollowerPool] = useState([]);
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
        const currentPeerPool = await getPeerPool(currentUser.id);
        setUser(currentUser);
        setPosts(currentPosts);
        setPeerPool(currentPeerPool.users);
        setRequestSentPool(currentUser.following_request);
        setRequestReceivedPool(currentUser.followed_request);
        setFollowerPool(currentUser.followers);
        setFollowedPool(currentUser.following);
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
        {peerPool.length > 0 ? (
          <div>
            {peerPool.map((peer) => (
              <Peer 
                key={user.id} 
                userId={user.id} 
                peer={peer} 
                requestSentPool={requestSentPool} 
                setRequestSentPool={setRequestSentPool} 
                requestReceivedPool={requestReceivedPool} 
                setRequestReceivedPool={setRequestReceivedPool}
                followedPool={followedPool}
                setFollowedPool={setFollowedPool}
                followerPool={followerPool}
                setFollowerPool={setFollowerPool} 
                setError={setError} 
              />
            ))}
          </div>
        ) : (
          <></>
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