import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import Post from './Post';
import Peer from './Peer';
import getCurrentUser from '../api/getCurrentUser';
// add getCurrentPeer and use peerId from params
import getPostsForPeer from '../api/getPostsForPeer';
import logOutUser from '../api/logOutUser';
import getPeersForPeer from '../api/getPeersForPeer';
import formatBirthday from '../utils/formatBirthday';

function PeerProfile() {
    const [user, setUser] = useState(null);
    const [peer, setPeer] = useState(null);
    const [posts, setPosts] = useState([]);
    const [peerPool, setPeerPool] = useState([]);
    const [requestSentPool, setRequestSentPool] = useState([]);
    const [requestReceivedPool, setRequestReceivedPool] = useState([]);
    const [followedPool, setFollowedPool] = useState([]);
    const [followerPool, setFollowerPool] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { peerId } = useParams();

    async function handleLogout() {
        try {
            await logOutUser();
            navigate('/');
        } catch (err) {
            setError(err);
        };
    };

    useEffect(() => {
        async function initializePage() {
            try {
                const currentUser = await getCurrentUser();
                // make a constant for currentPeer using getCurrentPeer api call
                const currentPosts = await getPostsForPeer(peer.id);
                const currentPeerPool = await getPeersForPeer(peer.id);
                setUser(currentUser);
                setPosts(currentPosts.posts);
                setPeerPool(currentPeerPool.users);
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

    if (user && peer) {
        const activeDate = new Date(peer.createdAt);

        return (
            <div>
                <div>
                    <h1>{peer.firstName} {peer.lastName}</h1>
                    <p>Active since {activeDate.toLocaleDateString('en-CA', { dateStyle: 'medium' })}</p>
                    <p>{peer.city}</p>
                    <p>{formatBirthday(peer.birthDate)}</p>
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
                            // do I need to change userId?
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
                <button onClick={handleLogout}>Log Out</button>
            </div>
        )
    };

    if (!peer) {
        return (
            <div>
                <h1>No Peer Found</h1>
                <Link to='/'>
                    <button>Go to Homepage</button>
                </Link>
            </div>
        )
    }

    return (
        <div>
            <h1>Not Authenticated</h1>
            <Link to='/'>
                <button>Go to Homepage</button>
            </Link>
        </div>
    )
};

export default PeerProfile;