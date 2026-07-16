import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import Header from './Header';
import Footer from './Footer';
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
                const currentPeerPool = await getPeerPoolForPeer(Number(peerId));
                const currentPosts = await getPostsForPeer(Number(peerId));
                setUser(currentUser);
                setPeer(currentPeer.user);
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

    if (!user.following.some(follower => follower.followedUserId === peer.id) || user.following.length === 0) {
        return (
            <div className='page'>
                <Header user={user} setError={setError} />
                <h1>You are not following this user and their account info is private</h1>
                <Link to='/user/network'>
                    <button>Go to Your User Network Page</button>
                </Link>
                <Footer />
            </div>
        )
    }

    if (user && peer) {
        const activeDate = new Date(peer.createdAt);

        return (
            <div className='page'>
                <Header user={user} setError={setError} />
                <main>
                    <section className='peer-details'>
                        <h1>{peer.firstName} {peer.lastName}</h1>
                        <img src={peer.profilePicFilePath} className='image profile' />
                        <p>Active since {activeDate.toLocaleDateString('en-CA', { dateStyle: 'medium' })}</p>
                        <p>Lives in {peer.city}</p>
                        <p>Born on {formatBirthday(peer.birthDate)}</p>
                    </section>
                    <h3>Posts</h3>
                    <section className='user-posts'>
                        {posts.length > 0 ? (
                            <>
                                {posts.map((post) => (
                                    <Post key={post.id} userId={user.id} post={post} setPosts={setPosts} setError={setError} />
                                ))}
                            </>
                        ) : (
                            <div className='no-posts'>
                                <h3>No posts yet</h3>
                            </div>
                        )}
                    </section>
                    <h3>Following</h3>
                    <section className='user-peers'>
                        {peerPool.length > 0 ? (
                            peerPool
                                .filter((peer) => peer.followed.id !== user.id)
                                .map((peer) => (
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
                                )
                                )
                        ) : (
                            <>
                            {/* spacer */}
                                <div></div>
                                <div className='no-followers'>
                                    <h3>Not following anyone yet</h3>
                                </div>
                            </>
                        )}
                    </section>
                </main>
                <Footer />
            </div>
        )
    };

    if (!peer) {
        return (
            <div className='page'>
                <Header user={user} setError={setError} />
                <h1>No Peer Found</h1>
                <Link to='/'>
                    <button>Go to Homepage</button>
                </Link>
                <Footer />
            </div>
        )
    }

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

export default PeerProfile;