import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router';
import Peer from './Peer';
import getCurrentUser from '../api/getCurrentUser';
import logOutUser from '../api/logOutUser';
import deleteUser from '../api/deleteUser';
import getPeerPool from '../api/getPeerPool';
import formatBirthday from '../utils/formatBirthday';

function UserNetwork() {
  const [user, setUser] = useState(null);
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
        const currentPeerPool = await getPeerPool(currentUser.id);
        setUser(currentUser);
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
            <img src={user.profilePicFilePath} width={100}></img>
            <Link to={user.profilePicFilePath}>View Profile Picture</Link>
            <Link to='/user/profile/pic/update'>Update Profile Picture</Link>
            <p>Active since {activeDate.toLocaleDateString('en-CA', { dateStyle: 'medium' })}</p>
            <p>Lives in {user.city}</p>
            <p>Born on {formatBirthday(user.birthDate)}</p>
        </div>
        <h3>Users</h3>
        {peerPool.length > 0 ? (
          <div>
            {peerPool.map((peer) => (
              <Peer 
                key={peer.id} 
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
        <div>
          <Link to='/user/posts'>
            <button>Go to Your User Posts Page</button>
          </Link>
          <Link to='/user/update'>
            <button>Edit User Profile</button>
          </Link>
          <button onClick={handleDeleteUser}>Delete User</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
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

export default UserNetwork;