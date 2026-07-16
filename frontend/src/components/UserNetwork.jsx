import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import Peer from './Peer';
import getCurrentUser from '../api/getCurrentUser';
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

  useEffect(() => {
    async function initializePage() {
      try {
        const currentUser = await getCurrentUser();
        const currentPeerPool = await getPeerPool(currentUser.id);
        setUser(currentUser);
        setPeerPool(currentPeerPool.data);
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
        <Link to='/'>
          <button onClick={() => setError(null)}>Back to Homepage</button>
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
                <img src={user.profilePicFilePath} className='image profile' />
              </Link>
            <Link to='/user/profile/pic/update'>Update Profile Picture</Link>
            <p>Active since {activeDate.toLocaleDateString('en-CA', { dateStyle: 'medium' })}</p>
            <p>Lives in {user.city}</p>
            <p>Born on {formatBirthday(user.birthDate)}</p>
        </section>
        <h3>Users</h3>
        {peerPool.length > 0 ? (
          <section className='user-peers'>
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
          </section>
        ) : (
          <></>
        )}
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
      <Footer />
    </div>
  )
};

export default UserNetwork;