import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import getCurrentUser from '../api/getCurrentUser';
import createNewComment from '../api/createNewComment';
import handleChange from '../utils/handleChange';

function NewComment() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentData, setCommentData] = useState({
        text: '',
    });

    const navigate = useNavigate();
    const { postId } = useParams();

    async function handleNewComment(e) {
        e.preventDefault();

        try {
            const success = await createNewComment(postId, commentData);
            navigate('/user/posts');
        } catch (err) {
            setError(err);
        };
    };

    useEffect(() => {
        async function initializePage() {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (err) {
                setError(err);
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
                <button onClick={() => setError(null)}>Back to New Comment</button>
                <Footer />
            </div>
        )
    };

    if (user) {
        return (
            <div className='page'>
                <Header user={user} setError={setError} />
                <main>
                    <section className='form'>
                        <form onSubmit={(e) => handleNewComment(e)}>
                            <h3>New Comment</h3>
                            <label htmlFor="text">Text:<span className='red'>* required</span></label>
                            <textarea name='text' id='text' rows={3} cols={30} value={commentData.text} onChange={(e) => handleChange(e, setCommentData)} />
                            <button type='submit'>Submit New Comment</button>
                        </form>
                    </section>
                </main>
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

export default NewComment;