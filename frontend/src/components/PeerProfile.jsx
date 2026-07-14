import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import Post from './Post';
import Peer from './Peer';
import getCurrentUser from '../api/getCurrentUser';
import getCurrentPeer from '../api/getCurrentPeer';
import getPeerPoolForPeer from '../api/getPeerPoolForPeer';
import getPostsForPeer from '../api/getPostsForPeer';
import logOutUser from '../api/logOutUser';
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
                const currentPeer = await getCurrentPeer(Number(peerId));
                const currentPeerPool = await getPeerPoolForPeer(currentUser.id, Number(peerId));
                const currentPosts = await getPostsForPeer(Number(peerId));
                setUser(currentUser);
                setPeer(currentPeer.foundUser);
                setPosts(currentPosts.posts);
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
    }, [peerId]);

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
                <Link to='/user/posts'>
                    <button onClick={() => setError(null)}>Back to User Posts</button>
                </Link>
            </div>
        )
    };

    if (!user.following.some(follower => follower.followedUserId === peer.id) || user.following.length === 0) {
        return (
            <div>
                <h1>You are not following this user and their account info is private</h1>
                <Link to='/user/network'>
                        <button>Go to Your User Network Page</button>
                </Link>
            </div>
        )
    }

    if (user && peer) {
        const activeDate = new Date(peer.createdAt);

        return (
            <div>
                <div>
                    <h1>{peer.firstName} {peer.lastName}</h1>
                    <img src={peer.profilePicFilePath} width={100}></img>
                    <p>Active since {activeDate.toLocaleDateString('en-CA', { dateStyle: 'medium' })}</p>
                    <p>Lives in {peer.city}</p>
                    <p>Born on {formatBirthday(peer.birthDate)}</p>
                </div>
                <h3>Posts</h3>
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
                <h3>Following</h3>
                {peerPool.some(peer => peer.followed.id === user.id) ? (
                    <div>
                        <img src={peerPool[0].followed.profilePicFilePath} width={50}></img>
                        <Link to='/user/network'>{peerPool[0].followed.firstName} {peerPool[0].followed.lastName}</Link>
                    </div>
                ) : (
                peerPool.length > 0 ? (
                    <div>
                        {peerPool.map((peer) => (
                            <Peer
                                key={peer.followed.id}
                                userId={user.id}
                                peer={peer.followed}
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
                ))}
                <div>
                    <Link to='/user/posts'>
                        <button>Go to Your User Posts Page</button>
                    </Link>
                    <Link to='/user/network'>
                        <button>Go to Your Follower Network Page</button>
                    </Link>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
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